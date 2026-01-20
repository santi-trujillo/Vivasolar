document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.setAttribute("aria-expanded", "false");

    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = mainNav.classList.toggle("is-active");
      navToggle.classList.toggle("is-active");
      navToggle.setAttribute("aria-expanded", isActive);
    });

    mainNav.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        mainNav.classList.remove("is-active");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.addEventListener("click", (event) => {
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
  });

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".card, .hero-section h1, .hero-section p, .hero-section .cta-button, section h2",
  );

  animatedElements.forEach((el) => {
    el.classList.add("fade-in-up");
    observer.observe(el);
  });
});
