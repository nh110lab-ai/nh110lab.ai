/* HEADER FX */
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
});

/* THEME */
const themeBtn = document.querySelector(".theme-toggle");

function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
}

const saved = localStorage.getItem("theme");
applyTheme(saved || (window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light"));

themeBtn?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* REVEAL */
const reveals = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("reveal-visible");
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach((el) => obs.observe(el));

/* MOBILE NAV */
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

navToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
  navToggle.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
});

/* FAQ */
document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    item.classList.toggle("open");
  });
});

/* PARALLAX */
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".orb, .hero-orb").forEach((orb) => {
    const speed = orb.dataset.speed || 20;
    const x = (window.innerWidth / 2 - e.clientX) / speed;
    const y = (window.innerHeight / 2 - e.clientY) / speed;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const t = document.querySelector(link.getAttribute("href"));
    if (!t) return;
    window.scrollTo({ top: t.offsetTop - 60, behavior: "smooth" });
  });
});

/* COUNTERS */
function animateCounter(el) {
  const t = +el.dataset.value;
  let c = 0;
  const inc = t / 80;

  function update() {
    c += inc;
    el.textContent = c < t ? Math.floor(c) : t;
    if (c < t) requestAnimationFrame(update);
  }
  update();
}

const statObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.querySelectorAll("[data-value]").forEach(animateCounter);
      statObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".stats-grid").forEach((el) => statObs.observe(el));

/* FLOATING ORBS */
function floatElement(el, intensity = 10) {
  let y = 0, dir = 1;
  function loop() {
    y += dir * 0.1;
    if (Math.abs(y) > intensity) dir *= -1;
    el.style.transform = `translateY(${y}px)`;
    requestAnimationFrame(loop);
  }
  loop();
}

document.querySelectorAll(".orb, .hero-orb").forEach((el) => floatElement(el));
