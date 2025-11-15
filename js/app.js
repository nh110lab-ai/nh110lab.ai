/* ==========================================================
   CURSOR HALO FOLLOW
========================================================== */
const halo = document.querySelector(".cursor-halo");

document.addEventListener("mousemove", (e) => {
    halo.style.left = e.pageX + "px";
    halo.style.top = e.pageY + "px";
});

/* ==========================================================
   HEADER SHRINK ON SCROLL
========================================================== */
window.addEventListener("scroll", () => {
    const h = document.querySelector("header");
    if (window.scrollY > 40) h.classList.add("active");
    else h.classList.remove("active");
});

/* ==========================================================
   REVEAL ANIMATIONS (Intersection Observer)
========================================================== */
const reveals = document.querySelectorAll(".reveal, .section-title");
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("active");
    });
}, { threshold: 0.15 });

reveals.forEach(el => io.observe(el));

/* ==========================================================
   AUTO DARK/LIGHT MODE — Apple Style
========================================================== */
const body = document.body;
const sections = document.querySelectorAll("section");

function updateThemeOnScroll() {
    const mid = window.innerHeight / 2;
    let currentId = "hero";

    sections.forEach(sec => {
        const r = sec.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
            currentId = sec.id;
        }
    });

    // Mode sombre sur pipeline, UI, pricing
    if (["pipeline", "ui", "pricing"].includes(currentId)) {
        body.classList.add("dark");
    } else {
        body.classList.remove("dark");
    }
}

window.addEventListener("scroll", updateThemeOnScroll);
window.addEventListener("load", updateThemeOnScroll);

/* ==========================================================
   PARALLAX — ORB BACKGROUND LAYERS
========================================================== */
const layers = [
    document.getElementById("orb-bg"),
    document.getElementById("orb-bg-2"),
    document.getElementById("orb-bg-3"),
];

window.addEventListener("mousemove", (e) => {
    const rx = (e.clientX / window.innerWidth - 0.5) * 30;
    const ry = (e.clientY / window.innerHeight - 0.5) * 30;

    layers.forEach((layer, i) => {
        const depth = (i + 1) * 15;
        layer.style.transform = `translate(${rx / depth}px, ${ry / depth}px)`;
    });
});

/* ==========================================================
   CARD TILT 3D + LIGHT FOLLOW
========================================================== */
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (y - 0.5) * 18;
        const tiltY = (x - 0.5) * -18;

        card.style.transform =
            `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.04)`;

        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
    });
});

/* ==========================================================
   PARTICLES — APPLE INTELLIGENCE STYLE
========================================================== */
const canvas = document.createElement("canvas");
canvas.id = "aiParticles";
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.zIndex = -8;
canvas.style.pointerEvents = "none";

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let w, h;
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = [];
const COUNT = 70;

function createParticle() {
    const size = Math.random() * 3 + 2;
    const speed = Math.random() * 0.5 + 0.2;

    return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size,
        color:
            Math.random() > 0.66
                ? "rgba(157,107,255,0.7)"
                : Math.random() > 0.33
                ? "rgba(0,198,255,0.7)"
                : "rgba(255,77,222,0.7)",
    };
}

for (let i = 0; i < COUNT; i++) particles.push(createParticle());

function animateParticles() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();
