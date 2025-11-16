/* =====================================================
   AURORA BACKGROUND ENGINE (canvas)
===================================================== */
const canvas = document.createElement("canvas");
canvas.id = "aurora-bg";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");

let w, h, t = 0;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Aurora color waves
function drawAurora() {
  t += 0.002;

  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < 6; i++) {
    const grad = ctx.createLinearGradient(
      0, 0,
      w, h * (0.3 + Math.sin(t + i) * 0.2)
    );

    grad.addColorStop(0, `hsla(${(i * 60 + t*300) % 360}, 90%, 70%, 0.22)`);
    grad.addColorStop(1, `hsla(${(i * 60 + 120 + t*300) % 360}, 90%, 65%, 0.18)`);

    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.moveTo(0, h * Math.sin(t + i * 0.8) * 0.4 + h / 2);

    for (let x = 0; x < w; x++) {
      ctx.lineTo(
        x,
        h * Math.sin(t + i*0.5 + x*0.0007) * 0.25 + h/2
      );
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
  }

  requestAnimationFrame(drawAurora);
}
drawAurora();

/* =====================================================
   ANIMATION SCROLL (fade-up)
===================================================== */
function revealOnScroll() {
  const elements = document.querySelectorAll(".fade-up");

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =====================================================
   PARALLAX ORB (Gyroscope + Mouse)
===================================================== */
const hero = document.querySelector(".hero");
const orb = document.querySelector(".hero-orb");
const logo = document.querySelector(".hero-logo-3d");

let useGyro = false;

// Gyroscope (iPhone / iPad)
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (e) => {
    if (!useGyro) useGyro = true;

    const x = e.gamma;
    const y = e.beta;

    const limit = 20;
    const moveX = Math.max(Math.min(x, limit), -limit);
    const moveY = Math.max(Math.min(y - 45, limit), -limit);

    orb.style.transform = `translate(${moveX * 2}px, ${moveY * 2}px)`;
    logo.style.transform = `translate(${moveX * 0.7}px, ${moveY * 0.7}px)`;
  });
}

// Mouse parallax fallback
document.addEventListener("mousemove", (e) => {
  if (useGyro) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 25;
  const y = (e.clientY / window.innerHeight - 0.5) * 25;

  orb.style.transform = `translate(${x * 3}px, ${y * 3}px)`;
  logo.style.transform = `translate(${x}px, ${y}px)`;
});

hero.addEventListener("mousemove", () => {
  orb.style.transition = "0s";
});
hero.addEventListener("mouseleave", () => {
  orb.style.transition = "1s ease-out";
  orb.style.transform = "translate(0,0)";
});

/* =====================================================
   NAVIGATION ACTIVE SECTION
===================================================== */
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveMenu() {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
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

/* =====================================================
   SMOOTH NAVIGATION
===================================================== */
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
