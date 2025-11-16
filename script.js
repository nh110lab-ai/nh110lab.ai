/* --- REVEAL ANIMATION --- */
const reveals = document.querySelectorAll(".reveal");

if (reveals.length) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );
  reveals.forEach((r) => obs.observe(r));
}

/* --- SMOOTH SCROLL & NAV ACTIVE --- */
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

if (navLinks.length && sections.length) {
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        if (!id) return;
        navLinks.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === `#${id}`)
        );
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => navObserver.observe(s));
}

/* --- SCROLL THEME SWITCH (fond clair) --- */
window.addEventListener("scroll", () => {
  const ratio =
    window.scrollY /
      (document.body.scrollHeight - window.innerHeight || 1) || 0;
  // luminosité de 96% (haut de page) vers 76% en bas, fond clair
  const brightness = 96 - ratio * 20;
  document.body.style.background = `hsl(210, 40%, ${brightness}%)`;
});

/* --- PARTICLES / ORB / HALO (sécurisé si canvas absent) --- */
const p = document.getElementById("particles");
const orb = document.getElementById("orb");
const halo = document.getElementById("halo");

let ctxP = null;
let ctxO = null;
let ctxH = null;

if (p && p.getContext) ctxP = p.getContext("2d");
if (orb && orb.getContext) ctxO = orb.getContext("2d");
if (halo && halo.getContext) ctxH = halo.getContext("2d");

function resizeCanvas() {
  if (!p || !orb || !halo) return;

  p.width = innerWidth;
  p.height = innerHeight;
  orb.width = innerWidth;
  orb.height = innerHeight;
  halo.width = innerWidth;
  halo.height = innerHeight;
}

if (ctxP && ctxO && ctxH) {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

/* Particules */
let particles = [];
if (ctxP && p) {
  particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * p.width,
    y: Math.random() * p.height,
    s: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  }));

  (function animateParticles() {
    if (!ctxP || !p) return;

    ctxP.clearRect(0, 0, p.width, p.height);
    ctxP.fillStyle = "rgba(15, 23, 42, 0.25)";
    particles.forEach((pt) => {
      pt.x += pt.vx;
      pt.y += pt.vy;
      if (pt.x < 0 || pt.x > p.width) pt.vx *= -1;
      if (pt.y < 0 || pt.y > p.height) pt.vy *= -1;

      ctxP.beginPath();
      ctxP.arc(pt.x, pt.y, pt.s, 0, Math.PI * 2);
      ctxP.fill();
    });
    requestAnimationFrame(animateParticles);
  })();
}

/* Orb animé */
let t = 0;
if (ctxO && orb) {
  (function animateOrb() {
    if (!ctxO || !orb) return;

    ctxO.clearRect(0, 0, orb.width, orb.height);
    const x = orb.width / 2;
    const y = orb.height / 2;
    const r = 180 + Math.sin(t) * 40;

    const grad = ctxO.createRadialGradient(x, y, r * 0.25, x, y, r);
    grad.addColorStop(0, "rgba(255,255,255,0.9)");
    grad.addColorStop(1, "rgba(59,130,246,0.08)");

    ctxO.fillStyle = grad;
    ctxO.beginPath();
    ctxO.arc(x, y, r, 0, Math.PI * 2);
    ctxO.fill();

    t += 0.01;
    requestAnimationFrame(animateOrb);
  })();
}

/* Halo */
let h = 0;
if (ctxH && halo) {
  (function animateHalo() {
    if (!ctxH || !halo) return;

    ctxH.clearRect(0, 0, halo.width, halo.height);
    ctxH.strokeStyle = `rgba(15, 23, 42, ${0.08 + Math.sin(h) * 0.04})`;
    ctxH.lineWidth = 2;

    ctxH.beginPath();
    ctxH.arc(
      halo.width / 2,
      halo.height / 2,
      240 + Math.sin(h) * 12,
      0,
      Math.PI * 2
    );
    ctxH.stroke();

    h += 0.01;
    requestAnimationFrame(animateHalo);
  })();
}

/* --- PRICING TOGGLE --- */
const toggleButtons = document.querySelectorAll(".toggle-btn");
const pilotCard = document.querySelector(".pricing-pilot");
const runCard = document.querySelector(".pricing-run");

if (toggleButtons.length && pilotCard && runCard) {
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleButtons.forEach((b) => b.classList.remove("toggle-btn-active"));
      btn.classList.add("toggle-btn-active");
      const mode = btn.dataset.mode;
      if (mode === "pilot") {
        pilotCard.classList.remove("hidden");
        runCard.classList.add("hidden");
      } else {
        pilotCard.classList.add("hidden");
        runCard.classList.remove("hidden");
      }
    });
  });
}

/* --- FAQ ACCORDION --- */
const faqItems = document.querySelectorAll(".faq-item");
if (faqItems.length) {
  faqItems.forEach((item) => {
    const q = item.querySelector(".faq-question");
    if (!q) return;
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      faqItems.forEach((i) => i.classList.remove("open"));
      if (!open) item.classList.add("open");
    });
  });
}

/* --- FORM HANDLER (maquette) --- */
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactForm.reset();
    alert(
      "Merci ! Pour rendre ce formulaire réellement fonctionnel, branchez-le à votre backend ou à votre outil de formulaires."
    );
  });
}

/* --- YEAR IN FOOTER --- */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}
