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
