/* =========================================================
   NH110LAB — Vision Engine JS
   Effets — Animations — Dark Mode Scroll — Particules
   ========================================================= */

/* =========================================================
   1. SCROLL DARK MODE (Apple Style)
   ========================================================= */
const body = document.body;

window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.55;
    if (window.scrollY > trigger) {
        body.classList.add("scroll-dark");
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("scroll-dark");
        body.classList.remove("dark-mode");
    }
});

/* =========================================================
   2. NAV SCROLL ACTIVE
   ========================================================= */
const nav = document.querySelector(".nav-vision");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        nav.classList.add("scroll-active");
    } else {
        nav.classList.remove("scroll-active");
    }
});

/* =========================================================
   3. REVEAL ON SCROLL (VisionOS animations)
   ========================================================= */
const revealElements = document.querySelectorAll(".reveal, .reveal-slide, .reveal-zoom");

function revealOnScroll() {
    const trigger = window.innerHeight * 0.82;

    revealElements.forEach((el) => {
        const top = el.getBoundingClientRect().top;

        if (top < trigger) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================================================
   4. PARTICLE ENGINE — VisionOS Floating Particles
   ========================================================= */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.speedY = (Math.random() - 0.5) * 0.7;

        // pastel apple colors
        const colors = ["#9cc9ff", "#b88aff", "#ff8ccd"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX * 0.6;
        this.y += this.speedY * 0.6;

        // reposition particles
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + "cc";
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    const number = canvas.width < 900 ? 60 : 130;
    for (let i = 0; i < number; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();

/* =========================================================
   5. TILT EFFECT 3D (for cards)
   ========================================================= */
document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y - rect.height / 2) / 18).toFixed(2);
        const rotateY = ((x - rect.width / 2) / -18).toFixed(2);

        card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
});

/* =========================================================
   6. SMOOTH SCROLL FOR NAV LINKS
   ========================================================= */
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

/* =========================================================
   7. OPTIONAL : AUTO-INTRO ANIMATION (HERO)
   ========================================================= */

window.addEventListener("load", () => {
    document.querySelector(".hero-content").classList.add("visible");
});
