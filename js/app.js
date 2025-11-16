/* ===========================================================================
   NH110LAB.AI — FULL ANIMATION ENGINE
   Smooth scroll reveal + theme switch + header FX + mobile menu + FAQ
=========================================================================== */

/* --------------------------------------
   1) HEADER STICKY ANIMATION
-------------------------------------- */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});


/* --------------------------------------
   2) THEME: AUTO + MANUAL OVERRIDE
-------------------------------------- */

const themeBtn = document.querySelector(".theme-toggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function initTheme() {
  const saved = localStorage.getItem("theme");

  if (saved) applyTheme(saved);
  else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }
}

themeBtn?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

initTheme();


/* --------------------------------------
   3) SMOOTH REVEAL ANIMATIONS
-------------------------------------- */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => observer.observe(el));


/* --------------------------------------
   4) MOBILE NAV MENU
-------------------------------------- */

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

navToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
  navToggle.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
});


/* --------------------------------------
   5) FAQ ACCORDION
-------------------------------------- */

document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-question");

  btn.addEventListener("click", () => {
    item.classList.toggle("open");
  });
});


/* --------------------------------------
   6) PARALLAX ORBS (OPTION VISUELLE)
-------------------------------------- */

document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".orb, .hero-orb").forEach((orb) => {
    const speed = orb.getAttribute("data-speed") || 20;
    const x = (window.innerWidth / 2 - e.clientX) / speed;
    const y = (window.innerHeight / 2 - e.clientY) / speed;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});


/* --------------------------------------
   7) SMOOTH SCROLL (Native but enhanced)
-------------------------------------- */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 60,
      behavior: "smooth",
    });
  });
});


/* --------------------------------------
   8) ANIMATED COUNTERS (Stats section)
-------------------------------------- */

function animateCounter(counter) {
  const target = +counter.dataset.value;
  let current = 0;
  const increment = target / 80;

  const update = () => {
    current += increment;
    if (current < target) {
      counter.textContent = Math.floor(current);
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  };

  update();
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll("[data-value]").forEach(animateCounter);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".stats-grid").forEach((el) => statObserver.observe(el));


/* --------------------------------------
   9) FLOAT ANIMATION LOOP FOR ORBS
-------------------------------------- */

function floatElement(el, intensity = 10, speed = 4000) {
  let y = 0, direction = 1;

  function animate() {
    y += direction * 0.1;
    if (Math.abs(y) > intensity) direction *= -1;

    el.style.transform = `translateY(${y}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}

document.querySelectorAll(".orb, .hero-orb").forEach((orb) => floatElement(orb));
