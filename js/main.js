(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var yearEl = document.getElementById("year");
  var heroVideo = document.querySelector(".hero-video");
  var heroBackdrop = document.querySelector(".hero-backdrop");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function markHeroVideoFailed() {
    if (heroBackdrop) heroBackdrop.classList.add("hero-video-failed");
  }

  if (heroVideo && heroBackdrop) {
    heroVideo.addEventListener("error", markHeroVideoFailed);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      heroVideo.muted = true;
      heroVideo.defaultMuted = true;
      heroVideo.setAttribute("muted", "");
      var tryPlay = function () {
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
