document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  // --- Mobile Menu Logic ---
  if (navToggle && mainNav) {
    // Initialize state
    navToggle.setAttribute("aria-expanded", "false");

    // Toggle menu on button click
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent immediate closing by the document listener
      const isActive = mainNav.classList.toggle("is-active");
      navToggle.classList.toggle("is-active");
      navToggle.setAttribute("aria-expanded", isActive);
    });

    // Close menu when a link inside is clicked (smooth UX)
    mainNav.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        mainNav.classList.remove("is-active");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- Global Click Listener to Close Menus ---
  document.addEventListener("click", (event) => {
    // Close mobile menu if click is outside the nav and the toggle
    if (mainNav && mainNav.classList.contains("is-active")) {
      if (
        !mainNav.contains(event.target) &&
        (!navToggle || !navToggle.contains(event.target))
      ) {
        mainNav.classList.remove("is-active");
        if (navToggle) {
          navToggle.classList.remove("is-active");
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    }

    // Note: Desktop submenus are now handled by CSS :hover, so no JS needed there.
  });

  // --- Scroll Animations (Premium Feel) ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, observerOptions);

  // Select elements to animate automatically
  const animatedElements = document.querySelectorAll(
    ".card, .hero-section h1, .hero-section p, .hero-section .cta-button, section h2"
  );

  animatedElements.forEach((el) => {
    el.classList.add("fade-in-up");
    observer.observe(el);
  });
});
