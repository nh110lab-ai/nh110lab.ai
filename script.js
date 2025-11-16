// ----- REVEAL ON SCROLL -----
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach(el => observer.observe(el));
} else {
  // Fallback
  revealEls.forEach(el => el.classList.add("visible"));
}

// ----- CANVAS HELPERS -----
function resizeCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

// ----- PARTICLES BACKGROUND -----
(function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = resizeCanvas(canvas);

  let particles = [];
  const COUNT = 110;

  function resetParticle(p) {
    p.x = Math.random() * window.innerWidth;
    p.y = Math.random() * window.innerHeight;
    p.vx = (Math.random() - 0.5) * 0.35;
    p.vy = (Math.random() - 0.5) * 0.35;
    p.r = Math.random() * 1.8 + 0.4;
    p.alpha = Math.random() * 0.6 + 0.2;
  }

  for (let i = 0; i < COUNT; i++) {
    const p = {};
    resetParticle(p);
    particles.push(p);
  }

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "rgba(255,255,255,0.9)";

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -50 || p.x > window.innerWidth + 50 || p.y < -50 || p.y > window.innerHeight + 50) {
        resetParticle(p);
      }

      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", () => {
    resizeCanvas(canvas);
  });
})();

// ----- ORB -----
(function initOrb() {
  const canvas = document.getElementById("orb");
  if (!canvas) return;
  const ctx = resizeCanvas(canvas);

  let t = 0;

  function draw() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    const x = w / 2;
    const y = h / 2;
    const baseRadius = Math.min(w, h) * 0.28;
    const r = baseRadius + Math.sin(t) * 28;

    const grad = ctx.createRadialGradient(x, y, r * 0.15, x, y, r);
    grad.addColorStop(0, "rgba(210,180,255,0.95)");
    grad.addColorStop(0.35, "rgba(150,110,255,0.9)");
    grad.addColorStop(1, "rgba(10,5,25,0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    t += 0.012;
    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", () => {
    resizeCanvas(canvas);
  });
})();

// ----- HALO -----
(function initHalo() {
  const canvas = document.getElementById("halo");
  if (!canvas) return;
  const ctx = resizeCanvas(canvas);

  let h = 0;

  function draw() {
    const w = window.innerWidth;
    const hgt = window.innerHeight;

    ctx.clearRect(0, 0, w, hgt);

    const radius = Math.min(w, hgt) * 0.4 + Math.sin(h) * 12;
    const alpha = 0.18 + Math.sin(h) * 0.08;

    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 1.8;

    ctx.beginPath();
    ctx.arc(w / 2, hgt / 2, radius, 0, Math.PI * 2);
    ctx.stroke();

    h += 0.01;
    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", () => {
    resizeCanvas(canvas);
  });
})();
