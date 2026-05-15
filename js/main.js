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
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var box = document.getElementById("lightbox");
  if (!items.length || !box) return;

  var imgEl = box.querySelector(".lightbox-img");
  var captionEl = box.querySelector(".lightbox-caption");
  var btnClose = box.querySelector(".lightbox-close");
  var btnPrev = box.querySelector(".lightbox-prev");
  var btnNext = box.querySelector(".lightbox-next");
  var current = 0;
  var lastFocus = null;

  function show(i) {
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
    if (i < 0) i = items.length - 1;
    if (i >= items.length) i = 0;
    var src = items[i].getAttribute("href");
    var pre = new Image();
    pre.src = src;
  }

  function open(i) {
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

  items.forEach(function (link, i) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      open(i);
    });
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
