// Mobile navigation toggle and small page enhancements.
document.addEventListener("DOMContentLoaded", () => {
  const silkIntro = document.querySelector(".silk-intro");
  if (silkIntro && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const finishIntro = () => {
      if (!silkIntro.isConnected) {
        return;
      }

      silkIntro.remove();
      document.body.classList.add("page-ready");
    };

    silkIntro.addEventListener(
      "animationend",
      (event) => {
        if (event.target === silkIntro) {
          finishIntro();
        }
      }
    );
    window.setTimeout(finishIntro, 3400);
  } else {
    silkIntro?.remove();
  }

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const year = document.getElementById("year");
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleIcon = themeToggle?.querySelector(".theme-toggle-icon");
  const themeToggleLabel = themeToggle?.querySelector(".theme-toggle-label");

  // Keep the copyright year current automatically.
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Restore the saved color theme and keep the toggle state accessible.
  if (themeToggle && themeToggleIcon && themeToggleLabel) {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const initialTheme = savedTheme === "dark" ? "dark" : "light";
    document.body.dataset.theme = initialTheme;

    const updateThemeToggle = (theme) => {
      const isDark = theme === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
      themeToggleIcon.textContent = isDark ? "☀" : "☾";
      themeToggleLabel.textContent = isDark ? "Light mode" : "Dark mode";
    };

    updateThemeToggle(initialTheme);
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
      document.body.dataset.theme = nextTheme;
      localStorage.setItem("portfolio-theme", nextTheme);
      updateThemeToggle(nextTheme);
    });
  }

  // Open or close the mobile navigation when the menu button is pressed.
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    // Close the mobile menu after a navigation link is selected.
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    // Close the menu if the browser returns to the desktop layout.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 640) {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }
});
