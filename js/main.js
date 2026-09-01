(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var yearEl = document.getElementById("year");
  var heroVideo = document.querySelector(".hero-video");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (heroVideo) {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      heroVideo.muted = true;
      heroVideo.defaultMuted = true;
      heroVideo.setAttribute("muted", "");
      var tryPlay = function () {
        heroVideo.playbackRate = 0.8;
        heroVideo.play().catch(function () {});
      };
      if (heroVideo.readyState >= 2) tryPlay();
      else heroVideo.addEventListener("loadeddata", tryPlay, { once: true });
    }
  }

  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
  }

  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 769px)").matches) {
      setOpen(false);
    }
  });
})();

(function () {
  var box = document.getElementById("lightbox");
  if (!box) return;

  var imgEl = box.querySelector(".lightbox-img");
  var captionEl = box.querySelector(".lightbox-caption");
  var btnClose = box.querySelector(".lightbox-close");
  var btnPrev = box.querySelector(".lightbox-prev");
  var btnNext = box.querySelector(".lightbox-next");
  var items = [];
  var current = 0;
  var lastFocus = null;

  function getGroup(link) {
    var group = link.closest("[data-lightbox], .gallery-grid");
    if (!group) return [link];
    return Array.prototype.slice.call(group.querySelectorAll(".gallery-item, .lightbox-item"));
  }

  function show(i) {
    if (!items.length) return;
    if (i < 0) i = items.length - 1;
    if (i >= items.length) i = 0;
    current = i;
    var link = items[i];
    var src = link.getAttribute("href");
    var thumb = link.querySelector("img");
    imgEl.src = src;
    imgEl.alt = thumb ? thumb.getAttribute("alt") || "" : "";
    captionEl.textContent = "Fotka " + (i + 1) + " z " + items.length;
    preload(i + 1);
    preload(i - 1);
  }

  function preload(i) {
    if (!items.length) return;
    if (i < 0) i = items.length - 1;
    if (i >= items.length) i = 0;
    var src = items[i].getAttribute("href");
    var pre = new Image();
    pre.src = src;
  }

  function open(group, i) {
    items = group;
    lastFocus = document.activeElement;
    box.hidden = false;
    document.body.classList.add("lightbox-open");
    show(i);
    btnClose.focus();
    document.addEventListener("keydown", onKey);
  }

  function close() {
    box.hidden = true;
    document.body.classList.remove("lightbox-open");
    imgEl.src = "";
    items = [];
    document.removeEventListener("keydown", onKey);
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  function onKey(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      show(current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      show(current - 1);
    }
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest(".gallery-item, .lightbox-item");
    if (!link || !link.getAttribute("href")) return;
    var group = getGroup(link);
    var index = group.indexOf(link);
    if (index === -1) return;
    e.preventDefault();
    open(group, index);
  });

  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", function () { show(current - 1); });
  btnNext.addEventListener("click", function () { show(current + 1); });

  box.addEventListener("click", function (e) {
    if (e.target === box || e.target === imgEl.parentNode) {
      close();
    }
  });

  var touchStartX = null;
  box.addEventListener("touchstart", function (e) {
    if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
  }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) show(current + 1);
      else show(current - 1);
    }
    touchStartX = null;
  });
})();

(function () {
  var links = document.querySelectorAll(".news-media[data-youtube-id]");
  if (!links.length) return;

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      var id = link.getAttribute("data-youtube-id");
      var type = link.getAttribute("data-youtube-type");
      var title = link.getAttribute("data-youtube-title") || "YouTube video";
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0&modestbranding=1";
      iframe.title = title;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      link.innerHTML = "";
      link.appendChild(iframe);
      link.classList.add("news-media--playing");
      if (type === "shorts") link.classList.add("news-media--shorts");
      link.removeAttribute("href");
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("role", "presentation");
    });
  });
})();

(function () {
  var STORAGE_KEY = "ekobrko-cookie-consent";
  var banner = document.getElementById("cookie-banner");
  if (!banner) return;

  function gtagSafe() {
    if (typeof window.gtag === "function") {
      window.gtag.apply(null, arguments);
    } else if (window.dataLayer && window.dataLayer.push) {
      window.dataLayer.push(arguments);
    }
  }

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function setStored(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) {}
  }

  function clearStored() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  function showBanner() {
    banner.hidden = false;
  }

  function hideBanner() {
    banner.hidden = true;
  }

  function accept() {
    setStored("accepted");
    gtagSafe("consent", "update", { "analytics_storage": "granted" });
    hideBanner();
  }

  function reject() {
    setStored("rejected");
    gtagSafe("consent", "update", { "analytics_storage": "denied" });
    hideBanner();
  }

  banner.querySelectorAll("[data-cookie-action]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var action = btn.getAttribute("data-cookie-action");
      if (action === "accept") accept();
      else reject();
    });
  });

  document.querySelectorAll("[data-cookie-settings]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      clearStored();
      showBanner();
    });
  });

  if (!getStored()) {
    showBanner();
  }
})();

(function () {
  var nodes = document.querySelectorAll(".email-obfuscated[data-user][data-domain]");
  nodes.forEach(function (el) {
    var user = el.getAttribute("data-user");
    var domain = el.getAttribute("data-domain");
    if (!user || !domain) return;
    var addr = user + "@" + domain;
    var a = document.createElement("a");
    a.href = "mailto:" + addr;
    a.textContent = addr;
    a.className = "email-link";
    el.replaceWith(a);
  });
})();

(function () {
  var form = document.getElementById("contact-form");
  var statusEl = document.getElementById("contact-form-status");
  var tokenInput = document.getElementById("contact-captcha-token");
  var questionEl = document.getElementById("contact-captcha-question");
  var captchaInput = document.getElementById("contact-captcha");
  var refreshBtn = document.getElementById("contact-captcha-refresh");
  var submitBtn = document.getElementById("contact-submit");
  var honeypot = document.getElementById("contact-website");
  if (!form || !statusEl || !tokenInput || !questionEl || !captchaInput || !submitBtn) return;

  var apiBase = "/api/contact";

  var MSG_NO_API =
    "Formulář teď nemůže kontaktovat server (často lokální náhled bez API – vrací se HTML místo dat). Po nasazení na Vercel to funguje; lokálně zkuste příkaz „vercel dev“.";

  function readApiJson(res) {
    return res.text().then(function (text) {
      var t = text.trim();
      if (
        t.charCodeAt(0) === 60 ||
        t.slice(0, 9).toLowerCase() === "<!doctype" ||
        t.slice(0, 5).toLowerCase() === "<html"
      ) {
        throw new Error(MSG_NO_API);
      }
      try {
        return { res: res, data: JSON.parse(text) };
      } catch (e) {
        throw new Error(MSG_NO_API);
      }
    });
  }

  function setStatus(kind, msg) {
    statusEl.textContent = msg || "";
    statusEl.className = "contact-form-status";
    if (kind === "error") statusEl.classList.add("contact-form-status--error");
    else if (kind === "success") statusEl.classList.add("contact-form-status--success");
  }

  function setLoading(on) {
    submitBtn.disabled = on;
    submitBtn.setAttribute("aria-busy", on ? "true" : "false");
    if (refreshBtn) refreshBtn.disabled = on;
  }

  function fetchChallenge() {
    return fetch(apiBase, { method: "GET", headers: { Accept: "application/json" } }).then(function (res) {
      return readApiJson(res);
    });
  }

  function applyChallenge(data) {
    tokenInput.value = data.token || "";
    questionEl.textContent = data.question || "…";
    captchaInput.value = "";
  }

  function initChallenge() {
    setLoading(true);
    setStatus("", "");
    return fetchChallenge()
      .then(function (pair) {
        if (!pair.res.ok) throw new Error(pair.data.error || "Nepodařilo se načíst ověření.");
        applyChallenge(pair.data);
      })
      .catch(function (err) {
        tokenInput.value = "";
        questionEl.textContent = "—";
        setStatus(
          "error",
          err.message ||
            "Nepodařilo se načíst ověření. Formulář potřebuje funkční adresu /api/contact (např. nasazení na Vercel)."
        );
      })
      .finally(function () {
        setLoading(false);
      });
  }

  function refreshChallenge() {
    setLoading(true);
    setStatus("", "");
    return fetchChallenge()
      .then(function (pair) {
        if (!pair.res.ok) throw new Error(pair.data.error || "Nepodařilo se načíst ověření.");
        applyChallenge(pair.data);
      })
      .catch(function (err) {
        tokenInput.value = "";
        questionEl.textContent = "—";
        setStatus(
          "error",
          err.message ||
            "Nepodařilo se načíst ověření. Formulář potřebuje funkční adresu /api/contact (např. nasazení na Vercel)."
        );
      })
      .finally(function () {
        setLoading(false);
      });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", function () {
      refreshChallenge();
    });
  }

  initChallenge();

  function normalizeEmailField(raw) {
    var s = typeof raw === "string" ? raw.trim().toLowerCase() : "";
    return s.replace(/^@+/, "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!tokenInput.value) {
      setStatus("error", "Nejprve načtěte ověřovací příklad (obnovte stránku).");
      return;
    }

    var emailVal = normalizeEmailField(form.email.value);

    var payload = {
      name: form.fullName.value.trim(),
      email: emailVal,
      phone: form.phone.value,
      message: form.message.value,
      captchaToken: tokenInput.value,
      captchaAnswer: captchaInput.value,
      website: honeypot ? honeypot.value : "",
    };

    if (!payload.name) {
      setStatus("error", "Vyplňte prosím jméno a příjmení.");
      return;
    }
    if (!payload.email) {
      setStatus("error", "Vyplňte prosím e-mail.");
      return;
    }

    setLoading(true);
    fetch(apiBase, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return readApiJson(res).then(function (pair) {
          if (!pair.res.ok) throw new Error(pair.data.error || "Odeslání se nezdařilo.");
          setStatus("success", "Děkujeme, zpráva byla odeslána. Ozveme se v co nejkratší době.");
          form.reset();
          return fetchChallenge().then(function (pair2) {
            if (!pair2.res.ok) return;
            applyChallenge(pair2.data);
          });
        });
      })
      .catch(function (err) {
        setStatus("error", err.message || "Odeslání se nezdařilo.");
      })
      .finally(function () {
        setLoading(false);
      });
  });
})();

(function () {
  var PROMO_END = new Date("2026-09-30T23:59:59+02:00").getTime();
  var modal = document.getElementById("promo-modal");
  if (!modal) return;
  if (Date.now() > PROMO_END) return;

  function openModal() {
    modal.hidden = false;
    document.body.classList.add("promo-modal-open");
    var closeBtn = modal.querySelector(".promo-modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("promo-modal-open");
  }

  modal.querySelectorAll("[data-promo-close]").forEach(function (el) {
    el.addEventListener("click", function () {
      closeModal();
    });
  });

  modal.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  modal.querySelectorAll("[data-promo-inquiry]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href") || "";
      var id = "poptavkovy-formular";
      if (href.indexOf("#") >= 0) {
        id = href.slice(href.indexOf("#") + 1) || id;
      }
      var target = document.getElementById(id);
      if (!target) {
        closeModal();
        return;
      }
      e.preventDefault();
      closeModal();
      window.setTimeout(function () {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", "#" + id);
        } else {
          window.location.hash = id;
        }
      }, 80);
    });
  });

  window.setTimeout(openModal, 450);
})();
