/**
 * Kontaktní formulář – GET vrátí matematickou úlohu + podepsaný token, POST odešle e-mail přes SMTP.
 *
 * Proměnné prostředí: viz ../.env.example
 */

const crypto = require("crypto");
const nodemailer = require("nodemailer");

function getSecret() {
  var s = process.env.CONTACT_SECRET;
  if (!s || String(s).length < 16) return null;
  return String(s);
}

function randomAddend() {
  return 2 + crypto.randomInt(11);
}

function signPayload(a, b, exp, secret) {
  var payload = a + ":" + b + ":" + exp;
  var sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return payload + "." + sig;
}

function verifyToken(token, secret) {
  if (!token || typeof token !== "string") return null;
  var lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) return null;
  var payload = token.slice(0, lastDot);
  var sig = token.slice(lastDot + 1);
  var expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) return null;
  } catch (e) {
    return null;
  }
  var parts = payload.split(":");
  if (parts.length !== 3) return null;
  var a = parseInt(parts[0], 10);
  var b = parseInt(parts[1], 10);
  var exp = parseInt(parts[2], 10);
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(exp)) return null;
  if (Date.now() > exp) return null;
  return { a: a, b: b };
}

function normalize(str, max) {
  if (typeof str !== "string") return "";
  var t = str.trim();
  return t.length > max ? t.slice(0, max) : t;
}

function headerSafe(s, max) {
  return String(s)
    .replace(/[\r\n\u2028\u2029]/g, " ")
    .slice(0, max || 200);
}

function isValidEmail(email) {
  if (!email || email.length > 254) return false;
  if (/[\r\n]/.test(email)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleGet(req, res) {
  var secret = getSecret();
  if (!secret) {
    return res.status(503).json({ error: "Kontaktní formulář není nakonfigurován." });
  }
  var a = randomAddend();
  var b = randomAddend();
  var exp = Date.now() + 15 * 60 * 1000;
  var token = signPayload(a, b, exp, secret);
  return res.status(200).json({
    question: a + " + " + b,
    token: token,
  });
}

async function handlePost(req, res) {
  var secret = getSecret();
  if (!secret) {
    return res.status(503).json({ error: "Kontaktní formulář není nakonfigurován." });
  }

  var body = req.body;
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Neplatná data." });
  }

  var honeypot = body.website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return res.status(400).json({ error: "Neplatná data." });
  }

  var name = normalize(body.name, 160);
  var email = normalize(body.email, 254).toLowerCase();
  var phone = normalize(body.phone, 40);
  var message = normalize(body.message, 4000);
  var captchaToken = typeof body.captchaToken === "string" ? body.captchaToken : "";
  var captchaAnswer = body.captchaAnswer;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Vyplňte prosím jméno a příjmení, e-mail a zprávu." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Zadejte platnou e-mailovou adresu." });
  }

  var parsed = verifyToken(captchaToken, secret);
  if (!parsed) {
    return res.status(400).json({
      error: "Ověření vypršelo nebo je neplatné. Načtěte nový příklad.",
    });
  }
  var ans = parseInt(String(captchaAnswer).trim(), 10);
  if (!Number.isFinite(ans) || ans !== parsed.a + parsed.b) {
    return res.status(400).json({ error: "Špatný výsledek příkladu. Zkuste to znovu." });
  }

  var host = process.env.SMTP_HOST;
  var user = process.env.SMTP_USER;
  var pass = process.env.SMTP_PASS;
  var port = Number(process.env.SMTP_PORT || 587);
  var secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass) {
    console.error("SMTP: chybí SMTP_HOST, SMTP_USER nebo SMTP_PASS");
    return res.status(503).json({ error: "Odesílání e-mailů momentálně není dostupné." });
  }

  var to = process.env.CONTACT_TO || "info@ekobrko.cz";
  var from = process.env.CONTACT_FROM || user;

  var fwd = req.headers["x-forwarded-for"];
  var ip = typeof fwd === "string" ? fwd.split(",")[0].trim() : "";

  var textBody =
    "Nová poptávka z webu ekobrko.cz\n\n" +
    "Jméno a příjmení: " +
    name +
    "\n" +
    "E-mail: " +
    email +
    "\n" +
    "Telefon: " +
    (phone || "(neuvedeno)") +
    "\n\n" +
    "Zpráva:\n" +
    message +
    "\n\n---\n" +
    "Čas: " +
    new Date().toISOString() +
    "\n" +
    "IP: " +
    (ip || "?") +
    "\n";

  var transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: { user: user, pass: pass },
    tls: { minVersion: "TLSv1.2" },
    ...(secure ? {} : { requireTLS: true }),
  });

  try {
    await transporter.sendMail({
      from: '"Web EkoBRKO" <' + from + ">",
      to: to,
      replyTo: email,
      subject: "[Web] Poptávka od " + headerSafe(name, 120),
      text: textBody,
    });
  } catch (err) {
    console.error(err);
    return res.status(502).json({
      error:
        "E-mail se nepodařilo odeslat. Zkuste to prosím později nebo nás kontaktujte telefonicky.",
    });
  }

  return res.status(200).json({ ok: true });
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    return handleGet(req, res);
  }
  if (req.method === "POST") {
    return handlePost(req, res);
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Metoda nepovolena." });
};
