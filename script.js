/* =========================================================
   NH110LAB.ai — SCRIPT LUXE MAX
   PARTIE 1/3 : ORB + HALO + PARTICLES + THEME AUTO + SWITCH
========================================================= */

/* -----------------------------
   🎨 THEME AUTO + SWITCH
----------------------------- */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  document.getElementById("theme-toggle").textContent =
    theme === "dark" ? "☾" : "☀";
}

// Détection auto du système
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");

applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

// Bouton toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* -----------------------------
   🔮 ORB PREMIUM (Canvas)
----------------------------- */
const orbCanvas = document.getElementById("orb");
const orbCtx = orbCanvas.getContext("2d");

function resizeOrb() {
  orbCanvas.width = window.innerWidth;
  orbCanvas.height = window.innerHeight;
}
resizeOrb();
window.addEventListener("resize", resizeOrb);

let orbX = 0;
let orbY = 0;
let orbSpeedX = 0.15;
let orbSpeedY = 0.08;

function drawOrb() {
  orbCtx.clearRect(0, 0, orbCanvas.width, orbCanvas.height);

  const gradient = orbCtx.createRadialGradient(
    orbX + orbCanvas.width / 2,
    orbY + orbCanvas.height / 2,
    40,
    orbX + orbCanvas.width / 2,
    orbY + orbCanvas.height / 2,
    280
  );

  gradient.addColorStop(0, getComputedStyle(document.documentElement).getPropertyValue("--orb-strong"));
  gradient.addColorStop(1, getComputedStyle(document.documentElement).getPropertyValue("--orb-soft"));

  orbCtx.fillStyle = gradient;
  orbCtx.beginPath();
  orbCtx.arc(
    orbCanvas.width / 2 + orbX,
    orbCanvas.height / 2 + orbY,
    260,
    0,
    Math.PI * 2
  );
  orbCtx.fill();

  // mouvement subtil premium
  orbX += orbSpeedX;
  orbY += orbSpeedY;

  if (Math.abs(orbX) > 80) orbSpeedX *= -1;
  if (Math.abs(orbY) > 50) orbSpeedY *= -1;

  requestAnimationFrame(drawOrb);
}
drawOrb();

/* -----------------------------
   🌕 HALO GLOW
----------------------------- */
const haloCanvas = document.getElementById("halo");
const haloCtx = haloCanvas.getContext("2d");

function resizeHalo() {
  haloCanvas.width = window.innerWidth;
  haloCanvas.height = window.innerHeight;
}
resizeHalo();
window.addEventListener("resize", resizeHalo);

function drawHalo() {
  haloCtx.clearRect(0, 0, haloCanvas.width, haloCanvas.height);

  const haloGradient = haloCtx.createRadialGradient(
    haloCanvas.width / 2,
    haloCanvas.height / 2,
    50,
    haloCanvas.width / 2,
    haloCanvas.height / 2,
    600
  );

  haloGradient.addColorStop(0, "rgba(120,90,255,0.25)");
  haloGradient.addColorStop(1, "rgba(120,90,255,0)");

  haloCtx.fillStyle = haloGradient;
  haloCtx.fillRect(0, 0, haloCanvas.width, haloCanvas.height);

  requestAnimationFrame(drawHalo);
}
drawHalo();

/* -----------------------------
   ✨ PARTICULES D’AMBIANCE
----------------------------- */
const particlesCanvas = document.getElementById("particles");
const pCtx = particlesCanvas.getContext("2d");

function resizeParticles() {
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;
}
resizeParticles();
window.addEventListener("resize", resizeParticles);

const particles = Array.from({ length: 60 }).map(() => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  size: Math.random() * 2 + 1,
  speed: Math.random() * 0.4 + 0.1
}));

function drawParticles() {
  pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
  pCtx.fillStyle = "rgba(255,255,255,0.45)";

  particles.forEach(p => {
    pCtx.beginPath();
    pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    pCtx.fill();

    p.y -= p.speed;
    if (p.y < -5) {
      p.y = particlesCanvas.height + 5;
      p.x = Math.random() * particlesCanvas.width;
    }
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();
/* -----------------------------------------
🌙 NAVIGATION MOBILE
----------------------------------------- */
const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  navToggle.classList.toggle("open");
});

/* -----------------------------------------
🌙 DEVIS EXPRESS (ESTIMATION)
----------------------------------------- */
const quoteForm = document.getElementById("quote-form");
const quoteBudget = document.getElementById("quote-budget");
const quoteBudgetValue = document.getElementById("quote-budget-value");
const quoteResult = document.getElementById("quote-result");

quoteBudget.addEventListener("input", () => {
  quoteBudgetValue.textContent = quoteBudget.value;
});

quoteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const type = document.getElementById("quote-type").value;
  const budget = Number(quoteBudget.value);
  const delay = document.querySelector("input[name='delay']:checked").value;

  let multiplier = 1;

  if (type === "agent") multiplier = 1.3;
  if (type === "workflow") multiplier = 1.1;
  if (type === "mix") multiplier = 1.6;

  if (delay === "fast") multiplier += 0.25;

  const estimation = Math.round(budget * multiplier);

  quoteResult.textContent = `Estimation : ~ ${estimation} €`;
});

/* -----------------------------------------
🌙 TABS — Témoignages
----------------------------------------- */
const tabButtons = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    panels.forEach(panel => {
      panel.classList.toggle("active", panel.dataset.panel === target);
    });
  });
});

/* -----------------------------------------
🌙 PRICING (Pilote / Run)
----------------------------------------- */
const pricingButtons = document.querySelectorAll(".pricing-btn");
const pricingPilot = document.getElementById("pricing-pilot");
const pricingRun = document.getElementById("pricing-run");

pricingButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    pricingButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (btn.dataset.mode === "pilot") {
      pricingPilot.classList.remove("hidden");
      pricingRun.classList.add("hidden");
    } else {
      pricingPilot.classList.add("hidden");
      pricingRun.classList.remove("hidden");
    }
  });
});

/* -----------------------------------------
🌙 FAQ
----------------------------------------- */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
/* -----------------------------------------
🌙 ASSISTANT IA — Widget flottant
----------------------------------------- */

const aiToggle = document.getElementById("ai-toggle");
const aiPanel = document.getElementById("ai-panel");
const aiClose = document.getElementById("ai-close");
const aiForm = document.getElementById("ai-form");
const aiInput = document.getElementById("ai-input");
const aiMessages = document.getElementById("ai-messages");

// Ouvrir / fermer le widget
aiToggle.addEventListener("click", () => {
  aiPanel.classList.toggle("active");
});

aiClose.addEventListener("click", () => {
  aiPanel.classList.remove("active");
});

// Ajouter un message dans l'UI
function addMessage(text, role = "bot") {
  const div = document.createElement("div");
  div.classList.add("ai-message", role);
  div.textContent = text;
  aiMessages.appendChild(div);

  // Auto scroll
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

// Envoi du message utilisateur
aiForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = aiInput.value.trim();
  if (!message) return;

  // UI user
  addMessage(message, "user");
  aiInput.value = "";

  // Réponse simple (placeholder)
  setTimeout(() => {
    addMessage("Je prépare une proposition d’automatisation…", "bot");
  }, 500);
});
