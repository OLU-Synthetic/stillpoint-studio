// Stillpoint Studio — tiny interaction layer.
// No dependencies. Safe for GitHub Pages.

(() => {
  const root = document.documentElement;
  const body = document.body;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Header elevation + scroll progress
  const header = document.querySelector("[data-elevate]");
  const progress = document.querySelector(".scroll-progress");

  function updateScrollUI() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("is-elevated", scrollTop > 12);
    if (progress && max > 0) progress.style.transform = `scaleX(${Math.min(scrollTop / max, 1)})`;
  }

  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });

  // Mobile menu
  const menuButton = document.querySelector(".menu-button");
  const mobileNav = document.querySelector("#mobile-nav");

  if (menuButton && mobileNav) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
      body.classList.remove("menu-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.hidden = isOpen;
      body.classList.toggle("menu-open", !isOpen);
    });

    mobileNav.addEventListener("click", (event) => {
      if (event.target.matches("a")) closeMenu();
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // Reveal-on-scroll
  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.getAttribute("data-delay");
        if (delay) entry.target.style.setProperty("--delay", `${delay}ms`);
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Project filters
  const filterButtons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".project-card[data-kind]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((b) => b.classList.toggle("is-active", b === button));

      cards.forEach((card) => {
        const show = filter === "all" || card.dataset.kind === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  // Cursor light
  const cursorOrb = document.querySelector(".cursor-orb");
  if (cursorOrb && !prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    window.addEventListener("pointermove", (event) => {
      tx = event.clientX;
      ty = event.clientY;
    }, { passive: true });

    const animate = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      cursorOrb.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };

    animate();
  }

  // Subtle magnetic buttons
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("pointermove", (event) => {
        const rect = el.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.12;
        const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.12;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
      });
    });
  }

  // Lightweight stills lightbox
  const lightbox = document.querySelector(".lightbox");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const lightboxFrame = document.querySelector(".lightbox-frame");
  const closeLightbox = document.querySelector(".lightbox-close");

  document.querySelectorAll("[data-gallery] .still").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxCaption || !lightboxFrame) return;
      lightboxCaption.textContent = button.dataset.caption || "Stillpoint Studio still";
      lightboxFrame.className = "lightbox-frame";
      lightboxFrame.style.background = getComputedStyle(button).background;
      lightbox.showModal();
    });
  });

  if (closeLightbox && lightbox) {
    closeLightbox.addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", (event) => {
      const rect = lightbox.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (outside) lightbox.close();
    });
  }
})();
