/* =========================================================
   NH110LAB — Vision Engine JS v2
   Apple Intelligence FX • VisionOS • Parallax • Particles
   ========================================================= */


/* ---------------------------------------------------------
   0. PERFORMANCE BOOST
--------------------------------------------------------- */
document.documentElement.style.setProperty("scroll-behavior", "smooth");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let allowHeavyFX = !prefersReducedMotion;


/* ---------------------------------------------------------
   1. AUTO DARK MODE ON SCROLL (APPLE STYLE)
--------------------------------------------------------- */
const body = document.body;

window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.55;

    if (window.scrollY > trigger) {
        body.classList.add("scroll-dark", "dark-mode");
    } else {
        body.classList.remove("scroll-dark", "dark-mode");
    }
});


/* ---------------------------------------------------------
   2. NAVIGATION REACTIVITY
--------------------------------------------------------- */
const nav = document.querySelector(".nav-vision");

window.addEventListener("scroll", () => {
    nav.classList.toggle("scroll-active", window.scrollY > 40);
});


/* ---------------------------------------------------------
   3. REVEAL ENGINE (new ultra smooth)
--------------------------------------------------------- */
const reveals = document.querySelectorAll(".reveal, .reveal-slide, .reveal-zoom");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    },
    { threshold: 0.2 }
);

reveals.forEach((el) => revealObserver.observe(el));


/* ---------------------------------------------------------
   4. PARTICLE ENGINE (VisionOS style)
--------------------------------------------------------- */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d", { alpha: true });

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;

        const palette = ["#9cc9ff", "#b88aff", "#ff8ccd"];
        this.color = palette[Math.floor(Math.random() * palette.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.reset();
        if (this.y > canvas.height || this.y < 0) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + "bb";
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = canvas.width < 900 ? 70 : 150;

    for (let i = 0; i < count; i++) particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}
if (allowHeavyFX) animateParticles();


/* ---------------------------------------------------------
   5. PARALLAX ORBS (Vision Pro Floating effect)
--------------------------------------------------------- */
const orbs = document.querySelectorAll(".hero-orb");

window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    orbs.forEach((orb, i) => {
        const intensity = (i + 1) * 0.6;
        orb.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
    });
});


/* ---------------------------------------------------------
   6. TILT 3D (New Magnetic Apple Hover)
--------------------------------------------------------- */
const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        const rotateX = ((y - r.height / 2) / 22).toFixed(2);
        const rotateY = -((x - r.width / 2) / 22).toFixed(2);

        card.style.transform = `
            perspective(700px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
});


/* ---------------------------------------------------------
   7. SMOOTH ANCHOR NAVIGATION
--------------------------------------------------------- */
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href.startsWith("#")) return;

        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
});


/* ---------------------------------------------------------
   8. HERO INTRO (Apple fade)
--------------------------------------------------------- */
window.addEventListener("load", () => {
    const hero = document.querySelector(".hero-content");
    if (hero) hero.classList.add("visible");
});
