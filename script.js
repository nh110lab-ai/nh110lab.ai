/* -----------------------------------------------------
   BACKGROUND ANIMÉ (Particules + Halo VisionOS)
----------------------------------------------------- */

const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* ----- Génération des particules ----- */
function createParticles() {
    particles = [];

    for (let i = 0; i < 70; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2.2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.15,
            speedY: (Math.random() - 0.5) * 0.15
        });
    }
}
createParticles();

/* ----- Animation des particules ----- */
function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();

/* -----------------------------------------------------
   EFFET LUMIÈRE / FOLLOW CURSOR (Halo Apple)
----------------------------------------------------- */

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function drawHalo() {
    const gradient = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 180
    );

    gradient.addColorStop(0, "rgba(255,255,255,0.12)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    requestAnimationFrame(drawHalo);
}
drawHalo();

/* -----------------------------------------------------
   ANIMATION SCROLL (sections qui apparaissent)
----------------------------------------------------- */

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
    });
}, { threshold: 0.2 });

document.querySelectorAll(".section, .card, .hero-content").forEach(el => {
    observer.observe(el);
});

/* -----------------------------------------------------
   SMOOTH SCROLL
----------------------------------------------------- */

document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });
        }
    });
});
