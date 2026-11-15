/* ============================================================
   Dota 2 Mobile — client script
   ============================================================ */
(function () {
  "use strict";

  /* ---------- config ---------- */
  var GITHUB_USER = "donrich99";
  var GITHUB_REPO = "dota2-mobile";
  var RELEASE_TAG = "v1.0.0";
  var APK_NAME = "hcirnod.apk";

  var releaseUrl =
    "https://github.com/" + GITHUB_USER + "/" + GITHUB_REPO +
    "/releases/download/" + RELEASE_TAG + "/" + APK_NAME;

  var isGitHubPages = /\.github\.io$/i.test(location.hostname);

  /* ---------- year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) closeNav();
    });
  }

  /* ---------- download wiring ---------- */
  var downloadBtn = document.getElementById("downloadBtn");
  var note = document.getElementById("dlNote");

  if (downloadBtn) {
    if (!isGitHubPages) {
      downloadBtn.setAttribute("href", "files/" + APK_NAME);
    }
    var alt = document.querySelector(".download-any");
    if (alt && !isGitHubPages) alt.setAttribute("href", "files/" + APK_NAME);
    downloadBtn.addEventListener("click", function () {
      if (note) note.textContent = "Starting download — check your notifications bar.";
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 45 + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- back to top ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        toTop.classList.toggle("show", window.scrollY > 600);
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- active section highlight ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = navLinks
    .map(function (a) {
      var id = a.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (a) {
            var active = a.getAttribute("href") === "#" + entry.target.id;
            a.style.color = active ? "#fff" : "";
            a.style.background = active && !a.classList.contains("nav-cta")
              ? "rgba(255,255,255,.07)"
              : "";
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- graceful image fallback ---------- */
  var art = document.querySelector(".art-frame img");
  if (art) {
    art.addEventListener("error", function () {
      art.style.display = "none";
    });
  }
})();
