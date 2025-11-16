// NH110LAB.ai front : scroll, nav, theme, pricing, FAQ, contact toast,
// canvases, and AI agent widget.

document.addEventListener("DOMContentLoaded", () => {
  /* -------- YEAR -------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* -------- THEME TOGGLE -------- */
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-toggle-icon");

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "☾" : "☀︎";
  };

  const storedTheme = localStorage.getItem("nh110-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    applyTheme(storedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("nh110-theme", next);
    });
  }

  /* -------- SMOOTH SCROLL ANCHORS -------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top,
        behavior: "smooth",
      });

      // close mobile nav
      document.documentElement.classList.remove("nav-open");
    });
  });

  /* -------- REVEAL ON SCROLL -------- */
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealElements.length) {
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
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  /* -------- ACTIVE NAV ON SCROLL -------- */
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

  /* -------- MOBILE NAV TOGGLE -------- */
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("nav-open");
    });
  }

  /* -------- PRICING TOGGLE -------- */
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
        pilotCard && pilotCard.classList.remove("hidden");
        runCard && runCard.classList.add("hidden");
      } else {
        pilotCard && pilotCard.classList.add("hidden");
        runCard && runCard.classList.remove("hidden");
      }
    });
  });

  /* -------- FAQ ACCORDION -------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  /* -------- CONTACT FORM TOAST -------- */
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

  /* -------- CANVAS ANIMATIONS -------- */

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

  /* -------- AI AGENT WIDGET -------- */

  const aiToggle = document.getElementById("ai-toggle");
  const aiPanel = document.getElementById("ai-panel");
  const aiClose = document.getElementById("ai-close");
  const aiForm = document.getElementById("ai-form");
  const aiInput = document.getElementById("ai-input");
  const aiMessages = document.getElementById("ai-messages");

  const appendMessage = (text, from = "bot") => {
    if (!aiMessages) return;
    const div = document.createElement("div");
    div.className =
      "ai-message " +
      (from === "user" ? "ai-message-user" : "ai-message-bot");
    div.textContent = text;
    aiMessages.appendChild(div);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  };

  const openPanel = () => {
    aiPanel && aiPanel.classList.add("open");
  };

  const closePanel = () => {
    aiPanel && aiPanel.classList.remove("open");
  };

  if (aiToggle) {
    aiToggle.addEventListener("click", openPanel);
  }
  if (aiClose) {
    aiClose.addEventListener("click", closePanel);
  }

  if (aiForm && aiInput) {
    aiForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const value = aiInput.value.trim();
      if (!value) return;

      appendMessage(value, "user");
      aiInput.value = "";

      // Réponse immédiate côté front pour la démo.
      appendMessage(
        "Je réfléchis à 2–3 idées d’agent pour ce flux… (connectez-moi à votre backend IA pour une vraie réponse 😉)"
      );

      // Exemple de hook pour votre backend / API IA :
      /*
      try {
        const response = await fetch("https://votre-backend/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: value }),
        });
        const data = await response.json();
        appendMessage(data.reply || "Agent : réponse vide.");
      } catch (err) {
        appendMessage("Impossible de joindre l’agent pour le moment.");
      }
      */
    });
  }
});
