(function () {
  "use strict";

  /* ---------- Sticky nav ---------- */
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    if (window.scrollY > 8) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var menuBtn = document.getElementById("menuToggle");
  var navPanel = document.getElementById("navPanel");
  var menuIconOpen = document.getElementById("iconMenu");
  var menuIconClose = document.getElementById("iconClose");

  function closeMenu() {
    navPanel.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    if (menuIconOpen) menuIconOpen.style.display = "";
    if (menuIconClose) menuIconClose.style.display = "none";
  }

  if (menuBtn && navPanel) {
    menuBtn.addEventListener("click", function () {
      var isOpen = navPanel.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      if (menuIconOpen) menuIconOpen.style.display = isOpen ? "none" : "";
      if (menuIconClose) menuIconClose.style.display = isOpen ? "" : "none";
    });

    navPanel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Theme (light/dark) ---------- */
  var root = document.documentElement;
  var THEME_KEY = "nexora-theme";
  var themeButtons = document.querySelectorAll("[data-theme-toggle]");

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    themeButtons.forEach(function (btn) {
      var sun = btn.querySelector('[data-icon="sun"]');
      var moon = btn.querySelector('[data-icon="moon"]');
      if (sun && moon) {
        sun.style.display = theme === "dark" ? "" : "none";
        moon.style.display = theme === "dark" ? "none" : "";
      }
    });
  }

  var storedTheme = null;
  try {
    storedTheme = window.localStorage.getItem(THEME_KEY);
  } catch (e) {
    /* storage unavailable — fall back silently */
  }
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(storedTheme || (prefersDark ? "dark" : "light"));

  themeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      var next = isDark ? "light" : "dark";
      applyTheme(next);
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* ignore */
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Contact form (no backend yet — friendly client-side UX) ---------- */
  var form = document.getElementById("contactForm");
  var successMsg = document.getElementById("formSuccess");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (successMsg) {
        successMsg.classList.add("is-visible");
        successMsg.setAttribute("role", "status");
      }
      form.reset();
    });
  }
})();
