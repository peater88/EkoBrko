(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var yearEl = document.getElementById("year");
  var heroVideo = document.querySelector(".hero-video");

  function describeWeather(code) {
    var c = Number(code);
    if (c === 0) return "jasno";
    if (c === 1) return "skoro jasno";
    if (c === 2) return "polojasno";
    if (c === 3) return "zataženo";
    if (c === 45 || c === 48) return "mlha";
    if (c >= 51 && c <= 55) return "mrholení";
    if (c === 56 || c === 57) return "mrznoucí mrholení";
    if (c >= 61 && c <= 65) return "déšť";
    if (c === 66 || c === 67) return "mrznoucí déšť";
    if (c >= 71 && c <= 75) return "sněžení";
    if (c === 77) return "sněhové zrny";
    if (c >= 80 && c <= 82) return "přeháňky";
    if (c === 85 || c === 86) return "sněhové přeháňky";
    if (c >= 95 && c <= 99) return "bouřky";
    return "oblačno";
  }

  function initWeatherWidget() {
    var root = document.getElementById("weather-widget");
    if (!root) return;

    var lat = "50.524";
    var lon = "14.971";
    var url =
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      lat +
      "&longitude=" +
      lon +
      "&current=temperature_2m,weather_code,wind_speed_10m&timezone=Europe%2FPrague&wind_speed_unit=kmh";

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("weather");
        return res.json();
      })
      .then(function (data) {
        var current = data && data.current;
        if (!current || current.temperature_2m == null) return;

        var tempEl = root.querySelector(".weather-widget-temp");
        var descEl = root.querySelector(".weather-widget-desc");
        var windEl = root.querySelector(".weather-widget-wind");
        var temp = Math.round(current.temperature_2m);
        var desc = describeWeather(current.weather_code);
        var wind =
          current.wind_speed_10m != null && !isNaN(Number(current.wind_speed_10m))
            ? Math.round(Number(current.wind_speed_10m))
            : null;

        if (tempEl) tempEl.textContent = temp + " °C";
        if (descEl) descEl.textContent = desc;
        if (windEl) {
          windEl.textContent = wind != null ? "Vítr " + wind + " km/h" : "";
        }

        root.setAttribute(
          "aria-label",
          "Počasí v Mnichově Hradišti: " + temp + " stupňů Celsia, " + desc + (wind != null ? ", vítr " + wind + " km/h" : "")
        );

        root.removeAttribute("hidden");
      })
      .catch(function () {});
  }

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

  initWeatherWidget();

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
