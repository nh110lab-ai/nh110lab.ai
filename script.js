// NH110LAB.ai — Script optimisé (devis, témoignages, pricing, FAQ, IA, canvas)
(function () {
  "use strict";

  // ===== UTILITAIRES =====
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const throttle = (fn, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const DOM = {
    root: document.documentElement,
    yearEl: null,
    themeToggle: null,
    themeIcon: null,
    navToggle: null,
    navLinks: null,
    sections: null,
    contactForm: null,
    toast: null,
    aiToggle: null,
    aiPanel: null,
    aiClose: null,
    aiForm: null,
    aiInput: null,
    aiMessages: null,
    quote: {
      form: null,
      type: null,
      budget: null,
      budgetValue: null,
      deadlineRadios: null,
      withAI: null,
      result: null,
      tagline: null,
      ideal: null,
      badge: null,
    },
    testimonials: {
      tabs: null,
      panels: null,
    },
    canvases: {
      particles: null,
      orb: null,
      halo: null,
    },
  };

  const state = {
    isCanvasActive: true,
    isNavOpen: false,
    currentTheme: "dark",
    animationFrame: null,
  };

  // ===== INIT DOM CACHE =====
  const initDOMCache = () => {
    DOM.yearEl = document.getElementById("year");
    DOM.themeToggle = document.querySelector(".theme-toggle");
    DOM.themeIcon = document.querySelector(".theme-toggle-icon");
    DOM.navToggle = document.querySelector(".nav-toggle");
    DOM.navLinks = document.querySelectorAll(".nav-link");
    DOM.sections = document.querySelectorAll("section[id]");
    DOM.contactForm = document.getElementById("contact-form");
    DOM.toast = document.getElementById("toast");

    DOM.aiToggle = document.getElementById("ai-toggle");
    DOM.aiPanel = document.getElementById("ai-panel");
    DOM.aiClose = document.getElementById("ai-close");
    DOM.aiForm = document.getElementById("ai-form");
    DOM.aiInput = document.getElementById("ai-input");
    DOM.aiMessages = document.getElementById("ai-messages");

    DOM.canvases.particles = document.getElementById("particles");
    DOM.canvases.orb = document.getElementById("orb");
    DOM.canvases.halo = document.getElementById("halo");

    // Devis
    DOM.quote.form = document.getElementById("quote-form");
    DOM.quote.type = document.getElementById("quote-type");
    DOM.quote.budget = document.getElementById("quote-budget");
    DOM.quote.budgetValue = document.getElementById("quote-budget-value");
    DOM.quote.deadlineRadios = document.querySelectorAll(
      'input[name="quote-deadline"]'
    );
    DOM.quote.withAI = document.getElementById("quote-ai");
    DOM.quote.result = document.getElementById("quote-result");
    DOM.quote.tagline = document.getElementById("quote-tagline");
    DOM.quote.ideal = document.getElementById("quote-ideal");
    DOM.quote.badge = document.getElementById("quote-badge");

    // Témoignages
    DOM.testimonials.tabs = document.querySelectorAll(".testimonial-tab");
    DOM.testimonials.panels = document.querySelectorAll(".testimonial-panel");
  };

  // ===== ANNÉE =====
  const updateYear = () => {
    if (DOM.yearEl) {
      DOM.yearEl.textContent = new Date().getFullYear();
    }
  };

  // ===== THÈME =====
  const applyTheme = (theme) => {
    state.currentTheme = theme;
    DOM.root.setAttribute("data-theme", theme);
    if (DOM.themeIcon) {
      DOM.themeIcon.textContent = theme === "dark" ? "☾" : "☀︎";
    }
  };

  const initTheme = () => {
    const storedTheme = localStorage.getItem("nh110-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      applyTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      applyTheme(prefersDark ? "dark" : "light");
    }

    if (DOM.themeToggle) {
      DOM.themeToggle.addEventListener("click", () => {
        const next = state.currentTheme === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem("nh110-theme", next);
      });
    }
  };

  // ===== NAVIGATION =====
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });

        DOM.root.classList.remove("nav-open");
        state.isNavOpen = false;
      });
    });
  };

  const setActiveNav = () => {
    const scrollPos = window.scrollY + 120;
    let currentId = "hero";

    DOM.sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY;
      if (scrollPos >= offsetTop) {
        currentId = section.id;
      }
    });

    DOM.navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const id = href.slice(1);
      link.classList.toggle("active", id === currentId);
    });
  };

  const initNavigation = () => {
    const throttledSetActiveNav = throttle(setActiveNav, 100);
    setActiveNav();
    window.addEventListener("scroll", throttledSetActiveNav, { passive: true });

    if (DOM.navToggle) {
      DOM.navToggle.addEventListener("click", () => {
        state.isNavOpen = !state.isNavOpen;
        DOM.root.classList.toggle("nav-open", state.isNavOpen);
      });
    }
  };

  // ===== REVEAL =====
  const initReveal = () => {
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
        { threshold: 0.15, rootMargin: "50px" }
      );
      revealElements.forEach((el) => revealObserver.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add("visible"));
    }
  };

  // Premium reveal
  const initPremiumReveal = () => {
    const els = document.querySelectorAll(".premium-reveal");
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("premium-reveal-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    els.forEach((el) => obs.observe(el));
  };

  // ===== PRICING =====
  const initPricing = () => {
    const toggleButtons = document.querySelectorAll(".toggle-btn");
    const pilotCard = document.querySelector(".pricing-pilot");
    const runCard = document.querySelector(".pricing-run");

    if (!toggleButtons.length || !pilotCard || !runCard) return;

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
  };

  // ===== FAQ =====
  const initFAQ = () => {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const question = item.querySelector(".faq-question");
      if (!question) return;

      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach((i) => {
          if (i !== item) i.classList.remove("open");
        });
        item.classList.toggle("open", !isOpen);
      });
    });
  };

  // ===== FORMULAIRE CONTACT =====
  const initContactForm = () => {
    if (!DOM.contactForm || !DOM.toast) return;
    DOM.contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      DOM.toast.classList.add("visible");
      setTimeout(() => DOM.toast.classList.remove("visible"), 3200);
      DOM.contactForm.reset();
    });
  };

  // ===== CANVAS ANIMATIONS =====
  let particles = [];
  let canvasContext = {};

  const initCanvas = () => {
    const { particles: pCanvas, orb: oCanvas, halo: hCanvas } = DOM.canvases;
    if (!pCanvas || !oCanvas || !hCanvas) return;

    canvasContext = {
      particles: pCanvas.getContext("2d", { alpha: true }),
      orb: oCanvas.getContext("2d", { alpha: true }),
      halo: hCanvas.getContext("2d", { alpha: true }),
    };

    resizeCanvas();
    initParticles();
  };

  const resizeCanvas = () => {
    const { particles, orb, halo } = DOM.canvases;
    const canvases = [particles, orb, halo];

    canvases.forEach((c) => {
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      const ctx = c.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
  };

  const initParticles = () => {
    particles = [];
    const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 80;
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
  };

  const drawParticles = () => {
    if (!DOM.canvases.particles || !canvasContext.particles) return;

    const ctx = canvasContext.particles;
    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.clearRect(0, 0, w, h);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      else if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      else if (p.y > h) p.y = 0;

      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "#60a5fa";
      ctx.fill();
    });
  };

  const drawOrb = (time) => {
    if (!DOM.canvases.orb || !DOM.canvases.halo) return;
    if (!canvasContext.orb || !canvasContext.halo) return;

    const orbCtx = canvasContext.orb;
    const haloCtx = canvasContext.halo;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const t = time * 0.00015;
    const cx = w * (0.25 + 0.2 * Math.cos(t));
    const cy = h * (0.2 + 0.1 * Math.sin(t * 1.3));

    orbCtx.clearRect(0, 0, w, h);
    haloCtx.clearRect(0, 0, w, h);

    const radius = Math.max(w, h) * 0.35;
    const gradient = orbCtx.createRadialGradient(cx, cy, 0, cx, cy, radius);
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

  const animationLoop = (time) => {
    if (!state.isCanvasActive) return;
    drawParticles();
    drawOrb(time);
    state.animationFrame = requestAnimationFrame(animationLoop);
  };

  const startAnimation = () => {
    state.isCanvasActive = true;
    state.animationFrame = requestAnimationFrame(animationLoop);
  };

  const stopAnimation = () => {
    state.isCanvasActive = false;
    if (state.animationFrame) cancelAnimationFrame(state.animationFrame);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) stopAnimation();
    else startAnimation();
  };

  // ===== WIDGET IA =====
  const appendMessage = (text, from = "bot") => {
    if (!DOM.aiMessages) return;
    const div = document.createElement("div");
    div.className = `ai-message ai-message-${from}`;
    div.textContent = text;
    DOM.aiMessages.appendChild(div);
    requestAnimationFrame(() => {
      DOM.aiMessages.scrollTop = DOM.aiMessages.scrollHeight;
    });
  };

  const openAIPanel = () => {
    DOM.aiPanel?.classList.add("open");
    DOM.aiInput?.focus();
  };

  const closeAIPanel = () => {
    DOM.aiPanel?.classList.remove("open");
  };

  const initAIWidget = () => {
    DOM.aiToggle?.addEventListener("click", openAIPanel);
    DOM.aiClose?.addEventListener("click", closeAIPanel);

    if (DOM.aiForm && DOM.aiInput) {
      DOM.aiForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = DOM.aiInput.value.trim();
        if (!value) return;
        appendMessage(value, "user");
        DOM.aiInput.value = "";

        appendMessage(
          "Je vois les grandes lignes de ton idée. Prochaine étape : on la transforme en système clair (agent, flux ou interface)."
        );
      });
    }
  };

  // ===== DEVIS INTERACTIF =====
  const formatEuro = (n) =>
    n.toLocaleString("fr-FR", { maximumFractionDigits: 0 });

  const computeQuote = () => {
    if (!DOM.quote.budget || !DOM.quote.type) return;

    const budget = Number(DOM.quote.budget.value || 1500);
    const type = DOM.quote.type.value;
    let deadline = "2 à 3 semaines";
    let intensity = "projet équilibré à mettre en place rapidement";

    const deadlineValue =
      Array.from(DOM.quote.deadlineRadios || []).find((r) => r.checked)
        ?.value || "standard";

    if (deadlineValue === "rapide") {
      deadline = "7 à 10 jours";
      intensity = "rythme soutenu, focus total sur votre périmètre";
    } else if (deadlineValue === "cool") {
      deadline = "3 à 5 semaines";
      intensity = "rythme confortable, avec plus d’allers-retours possibles";
    }

    const withAI = DOM.quote.withAI?.checked ?? true;

    let labelType = "";
    if (type === "site") labelType = "site ou landing page premium";
    else if (type === "agent") labelType = "agent IA ou automatisation ciblée";
    else labelType = "mix site + agent IA";

    const min = Math.max(500, budget * 0.8);
    const max = Math.max(min + 200, budget * 1.25);

    if (DOM.quote.budgetValue) {
      DOM.quote.budgetValue.textContent = formatEuro(budget);
    }

    if (DOM.quote.result) {
      DOM.quote.result.innerHTML = `
        ${withAI ? "Projet " : "Projet "}${labelType} ·
        enveloppe autour de <strong>${formatEuro(
          min
        )}–${formatEuro(max)} € HT</strong> ·
        mise en place en <strong>${deadline}</strong>.
      `;
    }

    if (DOM.quote.tagline) {
      DOM.quote.tagline.textContent = withAI
        ? "Vous décrivez le cas d’usage, l’IA et l’automatisation font le reste."
        : "On reste focalisés sur une expérience front ultra propre, sans surcouche IA.";
    }

    if (DOM.quote.ideal) {
      DOM.quote.ideal.textContent =
        "L’estimation est ajustée après un échange rapide (15–20 min) pour tenir compte de votre réalité.";
    }

    if (DOM.quote.badge) {
      DOM.quote.badge.textContent =
        "🔐 Aucun engagement — c’est une base pour voir si on s’aligne, pas une facture.";
    }
  };

  const initQuoteWidget = () => {
    if (!DOM.quote.form) return;

    computeQuote();

    DOM.quote.budget?.addEventListener("input", computeQuote);
    DOM.quote.type?.addEventListener("change", computeQuote);
    DOM.quote.withAI?.addEventListener("change", computeQuote);
    DOM.quote.deadlineRadios?.forEach((r) =>
      r.addEventListener("change", computeQuote)
    );

    DOM.quote.form.addEventListener("submit", (e) => {
      e.preventDefault();
      computeQuote();
    });
  };

  // ===== TÉMOIGNAGES =====
  const initTestimonials = () => {
    const tabs = DOM.testimonials.tabs;
    const panels = DOM.testimonials.panels;
    if (!tabs || !tabs.length || !panels || !panels.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.testimonial;

        tabs.forEach((t) => {
          const isActive = t === tab;
          t.classList.toggle("active", isActive);
          t.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        panels.forEach((panel) => {
          const id = panel.dataset.testimonialPanel;
          const isActive = id === target;
          panel.classList.toggle("active", isActive);
          panel.setAttribute("aria-hidden", isActive ? "false" : "true");
        });
      });
    });
  };

  // ===== PARALLAX (logo) =====
  const initParallax = () => {
    const parallaxItems = document.querySelectorAll("[data-parallax]");
    if (!parallaxItems.length) return;

    window.addEventListener(
      "mousemove",
      throttle((e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 8;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;
        parallaxItems.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 1;
          el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
      }, 20)
    );
  };

  // ===== RESIZE & CLEANUP =====
  const handleResize = debounce(() => {
    resizeCanvas();
    initParticles();
  }, 250);

  const cleanup = () => {
    stopAnimation();
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };

  // ===== INIT PRINCIPALE =====
  const init = () => {
    initDOMCache();
    updateYear();
    initTheme();
    initSmoothScroll();
    initNavigation();
    initReveal();
    initPremiumReveal();
    initPricing();
    initFAQ();
    initContactForm();
    initCanvas();
    initAIWidget();
    initQuoteWidget();
    initTestimonials();
    initParallax();

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    startAnimation();
    window.addEventListener("beforeunload", cleanup);

    // Debug simple dans la console
    window.NH110LAB = {
      state: () => ({ ...state, particles: particles.length }),
      resetAnimations: () => {
        initParticles();
      },
    };
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
/* --- EXTENSION ESTIMATION : Influenceur / E-commerce --- */

const projectType = document.getElementById("project-type");
const quoteResult = document.getElementById("quote-result");
const quoteTagline = document.getElementById("quote-tagline");
const quoteIdeal = document.getElementById("quote-ideal");

function updateCreatorEcomEstimate() {
  const type = projectType?.value;

  if (!type) return;

  // Influenceur / Créateur
  if (type === "creator") {
    quoteTagline.textContent =
      "Systèmes IA pour influenceurs, UGC, créateurs — automatisation du bruit et image claire.";

    quoteResult.innerHTML = `
      Pack Influenceur · <strong>900–1 400 € HT</strong> ·
      système IA + mini page d’accueil ·
      mise en place en <strong>5 à 8 jours</strong>.
    `;

    quoteIdeal.textContent =
      "Inclut : agent DM + gestion collab + scripts + automatisations simples.";
    return;
  }

  // E-commerce / Micro-boutique
  if (type === "ecom") {
    quoteTagline.textContent =
      "Support client IA, scénarios e-mail, suivi colis, automatisations clés.";

    quoteResult.innerHTML = `
      Pack E-commerce · <strong>1 200–1 800 € HT</strong> ·
      support IA + flux commandes + mini landing ·
      en <strong>7 à 12 jours</strong>.
    `;

    quoteIdeal.textContent =
      "Inclut : FAQ automatisée, suivi colis, réponses SAV, page produit optimisée.";
    return;
  }
}

// On écoute les changements du select
if (projectType) {
  projectType.addEventListener("change", updateCreatorEcomEstimate);
}
/* --- ESTIMATIONS PREMIUM : Influenceurs, E-commerçants, Freelance, Personal Brand --- */

const projectType = document.getElementById("project-type");

function updatePremiumEstimate() {
  const type = projectType?.value;
  if (!type) return;

  const tagline = document.getElementById("quote-tagline");
  const result = document.getElementById("quote-result");
  const ideal  = document.getElementById("quote-ideal");

  switch (type) {
    case "creator":
      tagline.textContent = "Automatisation premium pour créateurs : DM, collabs, contenu, filtres IA.";
      result.innerHTML = `Pack Influenceur / Créateur · <strong>900–1 400 € HT</strong> · système IA + mini landing · <strong>5–8 jours</strong>.`;
      ideal.textContent = "DM IA, filtrage collabs, agent commentaires, réponses automatiques mais naturelles.";
      break;

    case "ecom":
      tagline.textContent = "Support client IA, suivi colis, gestion demandes, scénarios e-mails automatisés.";
      result.innerHTML = `Pack E-commerce · <strong>1 200–1 800 € HT</strong> · support IA + automatisations · <strong>7–12 jours</strong>.`;
      ideal.textContent = "FAQ IA, gestion SAV, tracking commandes, réponses personnalisées, optimisation funnels.";
      break;

    case "personalbrand":
      tagline.textContent = "Construisez une présence digitale haut de gamme, propulsée par l’IA.";
      result.innerHTML = `Pack Marque personnelle · <strong>1 000–1 600 € HT</strong> · identité + site + IA · <strong>6–10 jours</strong>.`;
      ideal.textContent = "Landing pro, storytelling IA, assistant personnel pour interactions + contenus.";
      break;

    case "digitalfreelance":
      tagline.textContent = "Simplifiez votre activité : devis, messages, CRM et follow-up automatisés.";
      result.innerHTML = `Pack Freelance Digital · <strong>950–1 500 € HT</strong> · automatisations + mini CRM · <strong>5–9 jours</strong>.`;
      ideal.textContent = "Agent messages, relances auto, mini pipeline CRM, réponses personnalisées.";
      break;

    default:
      return; // les types déjà existants gardent ton script actuel
  }
}

if (projectType) {
  projectType.addEventListener("change", updatePremiumEstimate);
}
