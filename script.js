/* ============================================
   MODE CLAIR / SOMBRE AUTO + SMOOTH
============================================ */

function updateTheme() {
    const wrapper = document.getElementById("theme-wrapper");
    const scrollPos = window.scrollY;
    const max = 800;

    if (scrollPos > max) {
        wrapper.classList.add("light");
    } else {
        wrapper.classList.remove("light");
    }
}

window.addEventListener("scroll", updateTheme);
updateTheme();

/* ============================================
   CANVAS : ORB / HALO / PARTICULES (Apple style)
============================================ */

const orb = document.getElementById("bg-orb");
const halo = document.getElementById("bg-halo");
const particles = document.getElementById("bg-particles");

const orbCtx = orb.getContext("2d");
const haloCtx = halo.getContext("2d");
const partCtx = particles.getContext("2d");

function resize() {
    [orb, halo, particles].forEach(c => {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
    });
}
resize();
window.addEventListener("resize", resize);

/* ORB principal */
let orbX = window.innerWidth / 2;
let orbY = window.innerHeight / 2;

function drawOrb() {
    orbCtx.clearRect(0,0,orb.width,orb.height);

    const grd = orbCtx.createRadialGradient(
        orbX, orbY, 0,
        orbX, orbY, 250
    );

    grd.addColorStop(0, "rgba(255,255,255,0.7)");
    grd.addColorStop(1, "rgba(255,255,255,0)");

    orbCtx.fillStyle = grd;
    orbCtx.fillRect(0,0,orb.width,orb.height);
}

/* HALO réactif */
function drawHalo() {
    haloCtx.clearRect(0,0,halo.width,halo.height);

    const grd = haloCtx.createRadialGradient(
        orbX, orbY, 0,
        orbX, orbY, 600
    );

    grd.addColorStop(0, "rgba(255,255,255,0.15)");
    grd.addColorStop(1, "rgba(255,255,255,0)");

    haloCtx.fillStyle = grd;
    haloCtx.fillRect(0,0,halo.width,halo.height);
}

/* PARTICULES flottantes */
const particleArray = [];
for (let i = 0; i < 60; i++) {
    particleArray.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.6 - 0.3,
        speedY: Math.random() * 0.6 - 0.3,
        alpha: Math.random() * 0.5 + 0.2
    });
}

function drawParticles() {
    partCtx.clearRect(0,0,particles.width,particles.height);

    particleArray.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;

        partCtx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        partCtx.beginPath();
        partCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        partCtx.fill();
    });
}

/* HOVER / MOUSE FOLLOW */
window.addEventListener("mousemove", e => {
    orbX += (e.clientX - orbX) * 0.1;
    orbY += (e.clientY - orbY) * 0.1;
});

function animate() {
    drawOrb();
    drawHalo();
    drawParticles();
    requestAnimationFrame(animate);
}
animate();

