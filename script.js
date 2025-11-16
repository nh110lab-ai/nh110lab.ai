/* ============================
   ANIMATION SCROLL (fade-up)
============================ */
function revealOnScroll() {
  const elements = document.querySelectorAll(".fade-up");

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ===================================
   PARALLAX GYROSCOPIQUE (VISION PRO)
===================================== */
const hero = document.querySelector(".hero");
const orb = document.querySelector(".hero-orb");
const logo = document.querySelector(".hero-logo-3d");

let useGyro = false;

// Activer gyroscope si dispo (iPhone / iPad)
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (e) => {
    if (!useGyro) useGyro = true;

    const x = e.gamma; // gauche / droite
    const y = e.beta;  // avant / arrière

    const limit = 20;

    const moveX = Math.max(Math.min(x, limit), -limit);
    const moveY = Math.max(Math.min(y - 45, limit), -limit);

    orb.style.transform = `translate(${moveX * 2}px, ${moveY * 2}px)`;
    logo.style.transform = `translate(${moveX * 0.7}px, ${moveY * 0.7}px)`;
  });
}

/* ======================================================
   PARALLAX SOURIS (desktop) si gyroscope non disponible
====================================================== */
document.addEventListener("mousemove", (e) => {
  if (useGyro) return; // éviter conflits mobile

  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  orb.style.transform = `translate(${x * 3}px, ${y * 3}px)`;
  logo.style.transform = `translate(${x}px, ${y}px)`;
});

/* ============================
   SMOOTH NAVIGATION
============================ */
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href.startsWith("#")) return;

    e.preventDefault();
    document.querySelector(href).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

/* ============================
   ACTIVE MENU ON SCROLL
============================ */
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveMenu() {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 80;
    if (pageYOffset >= top) current = section.getAttribute("id");
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveMenu);
window.addEventListener("load", updateActiveMenu);

/* ============================
   ORB INTERACTION EXTRA
============================ */
hero.addEventListener("mousemove", () => {
  orb.style.transition = "0s";
});
hero.addEventListener("mouseleave", () => {
  orb.style.transition = "1s ease-out";
  orb.style.transform = "translate(0,0)";
});
