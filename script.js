/* ------------------------------------------------ */
/*                REVEAL ANIMATION                  */
/* ------------------------------------------------ */
const reveals = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
    });
}, { threshold: 0.2 });

reveals.forEach(r => obs.observe(r));



/* ------------------------------------------------ */
/*          SCROLL THEME (Apple Intelligence)       */
/* ------------------------------------------------ */
window.addEventListener("scroll", () => {
    const ratio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const brightness = 10 + ratio * 80;

    document.body.style.background = `hsl(240, 10%, ${brightness}%)`;
    document.body.style.color = brightness > 50 ? "#000" : "#fff";
});



/* ------------------------------------------------ */
/*                AUTO RESIZE CANVAS                */
/* ------------------------------------------------ */
function autoResizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
    autoResizeCanvas(bgOrb);
    autoResizeCanvas(bgHalo);
    autoResizeCanvas(bgParticles);
});



/* ------------------------------------------------ */
/*                PARTICLES BACKGROUND              */
/* ------------------------------------------------ */
const bgParticles = document.getElementById("bg-particles");
const ctxP = bgParticles.getContext("2d");
autoResizeCanvas(bgParticles);

let particles = Array.from({ length: 140 }, () => ({
    x: Math.random() * bgParticles.width,
    y: Math.random() * bgParticles.height,
    size: Math.random() * 2 + 0.6,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
}));

function animateParticles() {
    ctxP.clearRect(0, 0, bgParticles.width, bgParticles.height);
    ctxP.fillStyle = "rgba(255, 255, 255, 0.8)";

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > bgParticles.width) p.vx *= -1;
        if (p.y < 0 || p.y > bgParticles.height) p.vy *= -1;

        ctxP.beginPath();
        ctxP.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctxP.fill();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();



/* ------------------------------------------------ */
/*                    ORB ANIMÉ                     */
/* ------------------------------------------------ */
const bgOrb = document.getElementById("bg-orb");
const ctxO = bgOrb.getContext("2d");
autoResizeCanvas(bgOrb);

let orbT = 0;
function animateOrb() {
    ctxO.clearRect(0, 0, bgOrb.width, bgOrb.height);

    const x = bgOrb.width / 2;
    const y = bgOrb.height / 2;
    const r = 200 + Math.sin(orbT) * 40;

    const g = ctxO.createRadialGradient(x, y, r * 0.2, x, y, r);
    g.addColorStop(0, "rgba(150,100,255,0.7)");
    g.addColorStop(1, "rgba(20,10,40,0.05)");

    ctxO.fillStyle = g;
    ctxO.beginPath();
    ctxO.arc(x, y, r, 0, Math.PI * 2);
    ctxO.fill();

    orbT += 0.01;
    requestAnimationFrame(animateOrb);
}
animateOrb();



/* ------------------------------------------------ */
/*                   HALO ANIMÉ                     */
/* ------------------------------------------------ */
const bgHalo = document.getElementById("bg-halo");
const ctxH = bgHalo.getContext("2d");
autoResizeCanvas(bgHalo);

let haloT = 0;
function animateHalo() {
    ctxH.clearRect(0, 0, bgHalo.width, bgHalo.height);

    ctxH.strokeStyle = `rgba(255,255,255,${0.15 + Math.sin(haloT) * 0.1})`;
    ctxH.lineWidth = 2;

    ctxH.beginPath();
    ctxH.arc(bgHalo.width / 2, bgHalo.height / 2, 260 + Math.sin(haloT) * 12, 0, Math.PI * 2);
    ctxH.stroke();

    haloT += 0.01;
    requestAnimationFrame(animateHalo);
}
animateHalo();



/* ------------------------------------------------ */
/*        INTERACTIVE AI AGENT (WIDGET)             */
/* ------------------------------------------------ */

const agent = {
    messages: [
        "Bonjour 👋 besoin d’un agent IA pour ton business ?",
        "Je peux automatiser WhatsApp, CRM, Email, Prospection…",
        "Tu veux un diagnostic gratuit ?",
        "Ton entreprise mérite une IA autonome ⚡",
        "Je peux créer ton agent IA personnalisé en 24h."
    ],
    i: 0
};

function rotateAgentMessage() {
    const el = document.querySelector(".ai-text");
    if (!el) return;
    el.style.opacity = 0;

    setTimeout(() => {
        agent.i = (agent.i + 1) % agent.messages.length;
        el.textContent = agent.messages[agent.i];
        el.style.opacity = 1;
    }, 300);
}

setInterval(rotateAgentMessage, 4000);



/* ------------------------------------------------ */
/*     BONUS : CLICK → ANIMATION "PULSE" GLOW       */
/* ------------------------------------------------ */

document.addEventListener("click", (e) => {
    const pulse = document.createElement("div");
    pulse.className = "pulse-effect";
    pulse.style.left = e.clientX + "px";
    pulse.style.top = e.clientY + "px";
    document.body.appendChild(pulse);

    setTimeout(() => pulse.remove(), 1000);
});
