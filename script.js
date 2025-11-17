// Util: selecteurs rapides
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

// Validation utils
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateMinLength = (text, min = 10) => text.trim().length >= min;

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  /* ---------- YEAR ---------- */
  const yearSpan = $("#year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ---------- THEME TOGGLE ---------- */
  const savedTheme = window.localStorage?.getItem("nh110-theme") || "dark";
  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
  }

  const themeBtn = $(".theme-toggle");
  if (themeBtn) {
    const iconSpan = $(".theme-toggle-icon", themeBtn);

    const applyIcon = () => {
      const isLight = root.getAttribute("data-theme") === "light";
      iconSpan.textContent = isLight ? "☀︎" : "☾";
    };
    applyIcon();

    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        window.localStorage?.setItem("nh110-theme", next);
      } catch (e) {
        console.warn("localStorage unavailable");
      }
      applyIcon();
    });
  }

  /* ---------- NAV MOBILE ---------- */
  const navToggle = $(".nav-toggle");
  const nav = $(".nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });

    $$(".nav-link", nav).forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
      });
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = $$(".premium-reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("premium-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("premium-visible"));
  }

  /* ---------- LAZY LOAD IMAGES ---------- */
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
            }
            imageObserver.unobserve(img);
          }
        });
      },
      { rootMargin: "50px" }
    );

    $$("img[loading='lazy']").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  /* ---------- PRICING TOGGLE ---------- */
  const pricingToggle = $(".pricing-toggle");
  if (pricingToggle) {
    const pilotBtn = pricingToggle.querySelector('[data-mode="pilot"]');
    const runBtn = pricingToggle.querySelector('[data-mode="run"]');
    const pilotCard = $(".pricing-pilot");
    const runCard = $(".pricing-run");

    const setMode = (mode) => {
      if (!pilotCard || !runCard) return;
      if (mode === "pilot") {
        pilotCard.classList.remove("hidden");
        runCard.classList.add("hidden");
        pilotBtn.classList.add("toggle-btn-active");
        runBtn.classList.remove("toggle-btn-active");
        pilotBtn.setAttribute("aria-selected", "true");
        runBtn.setAttribute("aria-selected", "false");
      } else {
        runCard.classList.remove("hidden");
        pilotCard.classList.add("hidden");
        runBtn.classList.add("toggle-btn-active");
        pilotBtn.classList.remove("toggle-btn-active");
        runBtn.setAttribute("aria-selected", "true");
        pilotBtn.setAttribute("aria-selected", "false");
      }
    };

    pilotBtn?.addEventListener("click", () => setMode("pilot"));
    runBtn?.addEventListener("click", () => setMode("run"));
  }

  /* ---------- FAQ ACCORDION ---------- */
  $$(".faq-item").forEach((item) => {
    const btn = $(".faq-question", item);
    const answer = $(".faq-answer", item);
    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      $$(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      } else {
        btn.setAttribute("aria-expanded", "false");
      }
    });

    // Clavier: Enter/Space
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  /* ---------- TABS TÉMOIGNAGES ---------- */
  const testimonialTabs = $$(".testimonial-tab");
  if (testimonialTabs.length) {
    testimonialTabs.forEach((tab, idx) => {
      tab.setAttribute("aria-label", `Témoignage ${idx + 1}`);

      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-testimonial");
        testimonialTabs.forEach((t) => {
          const isActive = t === tab;
          t.classList.toggle("active", isActive);
          t.setAttribute("aria-selected", isActive);
        });
        $$(".testimonial-panel").forEach((panel) => {
          const id = panel.getAttribute("data-testimonial-panel");
          const isActive = id === target;
          panel.classList.toggle("active", isActive);
          panel.setAttribute("aria-hidden", !isActive);
        });
      });

      // Clavier: flèches
      tab.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          const nextIdx = e.key === "ArrowRight" 
            ? (idx + 1) % testimonialTabs.length 
            : (idx - 1 + testimonialTabs.length) % testimonialTabs.length;
          testimonialTabs[nextIdx].click();
          testimonialTabs[nextIdx].focus();
        }
      });
    });
  }

  /* ---------- DEVIS EXPRESS ---------- */
  const quoteForm = $("#quote-form");
  if (quoteForm) {
    const budgetRange = $("#quote-budget");
    const budgetValue = $("#quote-budget-value");
    const quoteType = $("#quote-type");
    const quoteSector = $("#quote-sector");
    const quoteAi = $("#quote-ai");
    const quoteDeadlineRadios = $$('input[name="quote-deadline"]', quoteForm);

    const resultEl = $("#quote-result");
    const taglineEl = $("#quote-tagline");
    const idealEl = $("#quote-ideal");
    const badgeEl = $("#quote-badge");
    const bulletsEl = $("#quote-bullets");

    const format = (val) =>
      Number(val).toLocaleString("fr-FR", { maximumFractionDigits: 0 });

    if (budgetRange && budgetValue) {
      budgetValue.textContent = format(budgetRange.value);
      budgetRange.addEventListener("input", () => {
        budgetValue.textContent = format(budgetRange.value);
        // Mise à jour en temps réel
        updateQuoteEstimate();
      });
    }

    // Mise à jour au changement
    quoteType?.addEventListener("change", updateQuoteEstimate);
    quoteSector?.addEventListener("change", updateQuoteEstimate);
    quoteAi?.addEventListener("change", updateQuoteEstimate);
    quoteDeadlineRadios.forEach((r) => r.addEventListener("change", updateQuoteEstimate));

    function updateQuoteEstimate() {
      if (!resultEl || !taglineEl || !idealEl || !badgeEl) return;

      const type = quoteType?.value || "site";
      const budget = Number(budgetRange?.value || 1500);
      const hasAi = quoteAi?.checked || false;
      const deadline =
        quoteDeadlineRadios.find((r) => r.checked)?.value || "standard";

      let envelope, tempo, labelType;

      if (budget < 1000) envelope = "900–1 500 € HT";
      else if (budget < 2500) envelope = "1 500–2 500 € HT";
      else if (budget < 4000) envelope = "2 500–3 500 € HT";
      else envelope = "3 500+ € HT";

      if (deadline === "rapide") tempo = "1 à 2 semaines";
      else if (deadline === "standard") tempo = "2 à 4 semaines";
      else tempo = "3 à 5 semaines, selon votre rythme";

      if (type === "site") labelType = "site vitrine / landing page";
      else if (type === "agent") labelType = "système d'agent IA / automatisation";
      else labelType = "mix site + agents IA";

      taglineEl.textContent =
        "À partir de vos réponses, on prépare un cadrage rapide. Le vrai devis se fait ensuite en direct.";

      resultEl.innerHTML = `Projet <strong>${labelType}</strong>${
        hasAi ? " avec composante IA intégrée" : ""
      } · enveloppe indicative autour de <strong>${envelope}</strong> · mise en ligne en <strong>${tempo}</strong>.`;

      idealEl.textContent =
        "Cette estimation sert de boussole. On affine ensuite en fonction de votre contexte, sans engagement.";

      badgeEl.textContent =
        "🔍 Estimation indicatrice — le but est de voir si on parle le même langage en termes de budget et de complexité.";

      // Mettre à jour les bullets aussi
      if (bulletsEl) {
        const bullets = [
          hasAi ? "1 page forte + 1 espace d'automatisation concret" : "1 page forte ou agent focus",
          "Intégration à vos outils existants lorsque c'est pertinent",
          "Mini tutoriel vidéo + documentation simple"
        ];
        bulletsEl.innerHTML = bullets
          .map((b) => `<li>${b}</li>`)
          .join("");
      }
    }

    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      updateQuoteEstimate();
    });
  }

  /* ---------- CONTACT FORM + VALIDATION ---------- */
  const contactForm = $("#contact-form");
  const toast = $("#toast");

  const showToast = (message = "✅ Message envoyé. Vous recevrez une réponse personnalisée sous peu.") => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  };

  if (contactForm) {
    const nameInput = $("#name");
    const emailInput = $("#email");
    const projectInput = $("#project");
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const validateForm = () => {
      let isValid = true;

      if (!nameInput?.value.trim()) {
        nameInput?.setAttribute("aria-invalid", "true");
        isValid = false;
      } else {
        nameInput?.removeAttribute("aria-invalid");
      }

      if (!validateEmail(emailInput?.value || "")) {
        emailInput?.setAttribute("aria-invalid", "true");
        isValid = false;
      } else {
        emailInput?.removeAttribute("aria-invalid");
      }

      if (!validateMinLength(projectInput?.value || "", 10)) {
        projectInput?.setAttribute("aria-invalid", "true");
        isValid = false;
      } else {
        projectInput?.removeAttribute("aria-invalid");
      }

      return isValid;
    };

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!validateForm()) {
        showToast("❌ Veuillez remplir tous les champs correctement.");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Envoi en cours...";
      }

      // Simule envoi (remplacer par API réelle)
      setTimeout(() => {
        contactForm.reset();
        showToast("✅ Message envoyé. Vous recevrez une réponse personnalisée sous peu.");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Envoyer mon message";
        }
      }, 800);
    });

    // Validation en temps réel
    emailInput?.addEventListener("blur", () => {
      if (emailInput.value && !validateEmail(emailInput.value)) {
        emailInput.setAttribute("aria-invalid", "true");
      } else {
        emailInput.removeAttribute("aria-invalid");
      }
    });
  }

  /* ---------- AI WIDGET ---------- */
  const aiToggle = $("#ai-toggle");
  const aiPanel = $("#ai-panel");
  const aiClose = $("#ai-close");
  const aiForm = $("#ai-form");
  const aiInput = $("#ai-input");
  const aiMessages = $("#ai-messages");

  const openAi = () => {
    if (!aiPanel) return;
    aiPanel.classList.add("open");
    aiInput?.focus();
  };

  const closeAi = () => {
    if (!aiPanel) return;
    aiPanel.classList.remove("open");
  };

  aiToggle?.addEventListener("click", openAi);
  aiClose?.addEventListener("click", closeAi);

  // Fermer au clic en dehors (optionnel)
  document.addEventListener("click", (e) => {
    if (aiPanel?.classList.contains("open") && 
        !aiPanel?.contains(e.target) && 
        !aiToggle?.contains(e.target)) {
      closeAi();
    }
  });

  const appendMessage = (text, from = "bot") => {
    if (!aiMessages) return;
    const div = document.createElement("div");
    div.className = `ai-message ${
      from === "bot" ? "ai-message-bot" : "ai-message-user"
    }`;
    div.textContent = text;
    div.setAttribute("role", "article");
    aiMessages.appendChild(div);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  };

  if (aiForm && aiInput) {
    aiForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = aiInput.value.trim();
      if (!value) return;

      appendMessage(value, "user");
      aiInput.value = "";

      // Afficher loader
      const loaderDiv = document.createElement("div");
      loaderDiv.className = "ai-message ai-message-bot";
      loaderDiv.textContent = "Réflexion en cours...";
      loaderDiv.id = "ai-loader";
      aiMessages.appendChild(loaderDiv);
      aiMessages.scrollTop = aiMessages.scrollHeight;

      // Réponse front-only (remplacer par appel API)
      setTimeout(() => {
        loaderDiv.remove();
        const suggestion = `Je vois un besoin autour de « ${value.slice(
          0,
          120
        )} ». 

Je proposerais :
1) Clarifier en 3 blocs : acquisition / traitement / suivi.
2) Définir un ou deux points où un agent IA peut filtrer, classer ou pré-rédiger.
3) Choisir le premier périmètre test (max 1–2 semaines de mise en place).

Décrivez-moi maintenant les outils que vous utilisez déjà (e-mail, CRM, boutique, etc.).`;
        appendMessage(suggestion, "bot");
      }, 1200);
    });

    // Enter pour envoyer
    aiInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        aiForm.dispatchEvent(new Event("submit"));
      }
    });
  }

  /* ---------- BACKGROUND CANVAS ---------- */
  const particlesCanvas = document.getElementById("particles");
  const orbCanvas = document.getElementById("orb");
  const haloCanvas = document.getElementById("halo");

  const resizeCanvas = (canvas) => {
    if (!canvas) return;
    const { innerWidth: w, innerHeight: h } = window;
    canvas.width = w * window.devicePixelRatio;
    canvas.height = h * window.devicePixelRatio;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  };

  const canvases = [particlesCanvas, orbCanvas, haloCanvas].filter(Boolean);
  canvases.forEach(resizeCanvas);
  window.addEventListener("resize", () => canvases.forEach(resizeCanvas));

  // Particules simples avec pause hors-viewport
  let particlesAnimationId = null;
  if (particlesCanvas) {
    const ctx = particlesCanvas.getContext("2d");
    if (!ctx) return;

    const particles = [];
    const COUNT = window.innerWidth < 768 ? 50 : 80;

    const makeParticle = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.9 + 0.1,
    });

    for (let i = 0; i < COUNT; i++) particles.push(makeParticle());

    const drawParticles = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(148,163,184,0.5)";
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const loopParticles = () => {
      if (!document.hidden) {
        drawParticles();
      }
      particlesAnimationId = requestAnimationFrame(loopParticles);
    };
    loopParticles();
  }

  // Orb lumineux avec pause hors-viewport
  let orbAnimationId = null;
  if (orbCanvas) {
    const ctx = orbCanvas.getContext("2d");
    if (!ctx) return;

    let t = 0;

    const drawOrb = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.75;
      const cy = h * 0.22 + Math.sin(t / 80) * 10;
      const r = Math.min(w, h) * 0.22;

      const grad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
      grad.addColorStop(0, "rgba(129,140,248,0.9)");
      grad.addColorStop(0.4, "rgba(79,70,229,0.5)");
      grad.addColorStop(1, "rgba(15,23,42,0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      t++;
      if (!document.hidden) {
        orbAnimationId = requestAnimationFrame(drawOrb);
      } else {
        orbAnimationId = null;
      }
    };
    drawOrb();
  }

  // Halo doux au centre
  if (haloCanvas) {
    const ctx = haloCanvas.getContext("2d");
    if (!ctx) return;

    const drawHalo = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createRadialGradient(
        w * 0.5,
        h * 0.0,
        0,
        w * 0.5,
        h * 0.0,
        h * 0.9
      );
      grad.addColorStop(0, "rgba(15,23,42,0.6)");
      grad.addColorStop(1, "rgba(0,0,0,1)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      requestAnimationFrame(drawHalo);
    };
    drawHalo();
  }

  // Pause animations au changement d'onglet
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (particlesAnimationId) cancelAnimationFrame(particlesAnimationId);
      if (orbAnimationId) cancelAnimationFrame(orbAnimationId);
    }
  });
});
