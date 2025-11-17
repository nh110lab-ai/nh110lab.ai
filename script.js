// =========================================================
// NH110LAB.ai — Interactions front
// Thème, menu mobile, devis, tabs, pricing, FAQ, contact, widget IA
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // -------- THEME TOGGLE --------
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("nh110lab-theme", theme);
    themeToggle.textContent = theme === "dark" ? "☾" : "☀︎";
  };

  const savedTheme = localStorage.getItem("nh110lab-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
  }

  themeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // -------- NAV MOBILE --------
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");

  navToggle?.addEventListener("click", () => {
    nav?.classList.toggle("open");
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });

  // -------- DEVIS EXPRESS --------
  const quoteForm = document.getElementById("quote-form");
  const quoteBudget = document.getElementById("quote-budget");
  const quoteBudgetValue = document.getElementById("quote-budget-value");
  const quoteType = document.getElementById("quote-type");
  const quoteResult = document.getElementById("quote-result");

  if (quoteBudget && quoteBudgetValue) {
    quoteBudget.addEventListener("input", () => {
      quoteBudgetValue.textContent = quoteBudget.value;
    });
  }

  quoteForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const budget = Number(quoteBudget?.value || 0);
    const type = quoteType?.value || "site";
    const delay = (
      document.querySelector('input[name="delay"]:checked') || {}
    ).value;

    let multiplier = 1;

    switch (type) {
      case "agent":
        multiplier = 1.25;
        break;
      case "workflow":
        multiplier = 1.1;
        break;
      case "mix":
        multiplier = 1.4;
        break;
      default:
        multiplier = 1;
    }

    if (delay === "fast") multiplier += 0.15;
    if (delay === "flex") multiplier -= 0.05;

    const estimation = Math.round(budget * multiplier);

    if (quoteResult) {
      quoteResult.textContent = `Estimation : ~ ${estimation.toLocaleString(
        "fr-FR"
      )} € (indicatif, à préciser après échange).`;
    }
  });

  // -------- TÉMOIGNAGES (TABS) --------
  const tabButtons = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      tabButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      panels.forEach((panel) => {
        const match = panel.dataset.panel === target;
        panel.toggleAttribute("hidden", !match);
      });
    });
  });

  // -------- PRICING (PILOTE / RUN) --------
  const pricingButtons = document.querySelectorAll(".pricing-btn");
  const pricingPilot = document.getElementById("pricing-pilot");
  const pricingRun = document.getElementById("pricing-run");

  pricingButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      pricingButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (btn.dataset.mode === "pilot") {
        pricingPilot?.classList.remove("hidden");
        pricingRun?.classList.add("hidden");
      } else {
        pricingPilot?.classList.add("hidden");
        pricingRun?.classList.remove("hidden");
      }
    });
  });

  // -------- FAQ ACCORDION --------
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question?.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  // -------- CONTACT FORM (fake submit) --------
  const contactForm = document.getElementById("contact-form");
  const feedback = document.getElementById("contact-feedback");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    contactForm.reset();
    if (feedback) {
      feedback.textContent = "Merci ! Votre message a bien été envoyé (simulation).";
    }
    setTimeout(() => {
      if (feedback) feedback.textContent = "";
    }, 5000);
  });

  // -------- WIDGET IA (Assistant Front) --------
  const aiToggle = document.getElementById("ai-toggle");
  const aiPanel = document.getElementById("ai-panel");
  const aiClose = document.getElementById("ai-close");
  const aiForm = document.getElementById("ai-form");
  const aiInput = document.getElementById("ai-input");
  const aiMessages = document.getElementById("ai-messages");

  const openAI = () => {
    aiPanel?.classList.add("active");
    aiPanel?.setAttribute("aria-hidden", "false");
  };

  const closeAI = () => {
    aiPanel?.classList.remove("active");
    aiPanel?.setAttribute("aria-hidden", "true");
  };

  aiToggle?.addEventListener("click", () => {
    if (aiPanel?.classList.contains("active")) {
      closeAI();
    } else {
      openAI();
    }
  });

  aiClose?.addEventListener("click", closeAI);

  const addMessage = (text, type = "bot") => {
    if (!aiMessages) return;
    const div = document.createElement("div");
    div.className = `ai-message ${type}`;
    div.textContent = text;
    aiMessages.appendChild(div);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  };

  aiForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = aiInput.value.trim();
    if (!value) return;
    addMessage(value, "user");
    aiInput.value = "";

    // Mini "logique" IA côté front (pas de call externe)
    setTimeout(() => {
      const suggestion =
        "Proposition :\n" +
        "- Agent principal pour filtrer et résumer les demandes.\n" +
        "- Workflow d'automatisation (notifications + tâches).\n" +
        "- Petit front clair pour déclencher / suivre les actions.";
      addMessage(suggestion, "bot");
    }, 400);
  });
});
