// Scroll reveal + active nav + mobile nav + pricing toggle + FAQ + canvases

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.scrollY - 80;

      window.scrollTo({
        top,
        behavior: "smooth",
      });

      // close mobile nav
      document.documentElement.classList.remove("nav-open");
    });
  });

  /* Reveal on scroll */
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  /* Active nav on scroll */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const setActiveNav = () => {
    const scrollPos = window.scrollY + 120;
    let currentId = "hero";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY;
      if (scrollPos >= offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const id = href.slice(1);
      link.classList.toggle("active", id === currentId);
    });
  };

  setActiveNav();
  window.addEventListener("scroll", setActiveNav);

  /* Mobile nav toggle */
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("nav-open");
    });
  }

  /* Pricing toggle */
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const pilotCard = document.querySelector(".pricing-pilot");
  const runCard = document.querySelector(".pricing-run");

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;
      toggleButtons.forEach((b) =>
        b.classList.toggle("toggle-btn-active", b === btn)
      );

      if (mode === "pilot") {
        pilotCard.classList.remove("hidden");
        runCard.classList.add("hidden");
      } else {
        pilotCard.classList.add("hidden");
        runCard.classList.remove("hidden");
      }
    });
  });

  /* FAQ accordion */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  /* Contact form fake submit + toast */
  const form = document.getElementById("contact-form");
  const toast = document.getElementById("toast");

  if (form && toast) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      toast.classList.add("visible");
      setTimeout(() => toast.classList.remove("visible"), 3200);
      form.reset();
    });
  }

  /* CANVAS ANIMATIONS */

  // Simple particles
  const particleCanvas = document.getElementById("particles");
  const orbCanvas = document.getElementById("orb");
  const haloCanvas = document.getElementById("halo");

  const resizeCanvas = () => {
    [particleCanvas, orbCanvas, haloCanvas].forEach((c) => {
      if (!c) return;
      const dpr = window.devicePixelRatio || 1;
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      const ctx = c.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
  };
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Particles
  const particles = [];
  const PARTICLE_COUNT = 80;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: 1 + Math.random() * 1.6,
      alpha: 0.2 + Math.random() * 0.5,
    });
  }

  const drawParticles = () => {
    if (!particleCanvas) return;
    const ctx = particleCanvas.getContext("2d");
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = window.innerWidth;
      if (p.x > window.innerWidth) p.x = 0;
      if (p.y < 0) p.y = window.innerHeight;
      if (p.y > window.innerHeight) p.y = 0;

      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "#60a5fa";
      ctx.fill();
    });
  };

  // Orb + halo
  const drawOrb = (time) => {
    if (!orbCanvas || !haloCanvas) return;

    const orbCtx = orbCanvas.getContext("2d");
    const haloCtx = haloCanvas.getContext("2d");
    const w = window.innerWidth;
    const h = window.innerHeight;

    const t = time * 0.00015;
    const cx = w * (0.25 + 0.2 * Math.cos(t));
    const cy = h * (0.2 + 0.1 * Math.sin(t * 1.3));

    orbCtx.clearRect(0, 0, w, h);
    haloCtx.clearRect(0, 0, w, h);

    // Orb
    const radius = Math.max(w, h) * 0.35;
    const gradient = orbCtx.createRadialGradient(
      cx,
      cy,
      0,
      cx,
      cy,
      radius
    );
    gradient.addColorStop(0, "rgba(129, 140, 248, 0.85)");
    gradient.addColorStop(0.3, "rgba(79, 70, 229, 0.65)");
    gradient.addColorStop(1, "rgba(15, 23, 42, 0)");

    orbCtx.fillStyle = gradient;
    orbCtx.fillRect(0, 0, w, h);

    // Halo
    const haloRadius = radius * 0.9;
    const haloGradient = haloCtx.createRadialGradient(
      cx,
      cy,
      haloRadius * 0.4,
      cx,
      cy,
      haloRadius
    );
    haloGradient.addColorStop(0, "rgba(129, 140, 248, 0.25)");
    haloGradient.addColorStop(1, "rgba(15, 23, 42, 0)");

    haloCtx.fillStyle = haloGradient;
    haloCtx.fillRect(0, 0, w, h);
  };

  const loop = (time) => {
    drawParticles();
    drawOrb(time);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
});
document.addEventListener('DOMContentLoaded', () => {
  // --- Année dynamique dans le footer ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Scroll fluide sur les ancres ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      const id = href && href.slice(1);
      const target = id && document.getElementById(id);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Animations "reveal" au scroll ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(el => observer.observe(el));
  } else {
    // fallback : tout visible si pas supporté
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // --- FAQ accordéon ---
  document.querySelectorAll('.faq-item').forEach(item => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // fermer les autres
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('open');
      });

      // toggle courant
      item.classList.toggle('open', !isOpen);
    });
  });

  // --- Toggle pricing pilote / run ---
  const toggleBtns = document.querySelectorAll('.pricing-toggle .toggle-btn');
  const pilotCard = document.querySelector('.pricing-pilot');
  const runCard = document.querySelector('.pricing-run');

  if (toggleBtns.length && pilotCard && runCard) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;

        toggleBtns.forEach(b =>
          b.classList.toggle('toggle-btn-active', b === btn)
        );

        if (mode === 'run') {
          pilotCard.classList.add('hidden');
          runCard.classList.remove('hidden');
        } else {
          pilotCard.classList.remove('hidden');
          runCard.classList.add('hidden');
        }
      });
    });
  }

  // TODO: effets visuels sur les canvas #particles, #orb, #halo
});
