/* MODE CLAIR / SOMBRE PROGRESSIF */
const wrapper = document.getElementById("theme-wrapper");

window.addEventListener("scroll", () => {
    const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (progress > 0.25) wrapper.classList.add("dark-mode");
    else wrapper.classList.remove("dark-mode");
});

/* PARTIES DU FOND ANIMÉ */
const bg = document.getElementById("background");
const ctx = bg.getContext("2d");

const particlesCanvas = document.getElementById("particles");
const ptx = particlesCanvas.getContext("2d");

bg.width = particlesCanvas.width = innerWidth;
bg.height = particlesCanvas.height = innerHeight;

/* ORBE IA */
let orb = { x: innerWidth/2, y: innerHeight/2, r: 130 };

/* PARTICLES */
let particles = [];
for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random()*innerWidth,
        y: Math.random()*innerHeight,
        vx: (Math.random()-0.5)*0.6,
        vy: (Math.random()-0.5)*0.6,
        size: Math.random()*2 + 1
    });
}

/* ANIMATION */
function animate() {
    requestAnimationFrame(animate);

    /* HALO + ORB */
    ctx.clearRect(0,0,bg.width,bg.height);

    let gradient = ctx.createRadialGradient(orb.x, orb.y, 40, orb.x, orb.y, orb.r);
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI*2);
    ctx.fill();

    /* PETITE ANIMATION ORBE */
    orb.x += Math.sin(Date.now()/2000)*0.3;
    orb.y += Math.cos(Date.now()/2500)*0.3;

    /* PARTICULES */
    ptx.clearRect(0,0,innerWidth,innerHeight);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > innerHeight) p.vy *= -1;

        ptx.fillStyle = "rgba(255,255,255,0.6)";
        ptx.fillRect(p.x, p.y, p.size, p.size);
    });
}

animate();

/* ORBE SUIVANT LÉGÈREMENT LA SOURIS */
window.addEventListener("mousemove", e => {
    orb.x += (e.clientX - orb.x) * 0.03;
    orb.y += (e.clientY - orb.y) * 0.03;
});

