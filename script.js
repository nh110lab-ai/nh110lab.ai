/* --- REVEAL ANIMATION --- */
const reveals = document.querySelectorAll(".reveal");
if (reveals.length) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );
  reveals.forEach((r) => obs.observe(r));
}

/* --- SMOOTH SCROLL & NAV ACTIVE --- */
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  });
});

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        if (!id) return;
        navLinks.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === `#${id}`)
        );
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => navObserver.observe(s));
}
/* --- HAO INTERACTIF TYPE APPLE INTELLIGENCE --- */
window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  // On écrit dans des CSS custom properties utilisées par body::before
  document.documentElement.style.setProperty("--cursor-x", x.toString());
  document.documentElement.style.setProperty("--cursor-y", y.toString());
});



/* --- CANVAS ELEMENTS (peuvent être absents sur certaines pages) --- */
const p = document.getElementById("particles");
const orb = document.getElementById("orb");
const halo = document.getElementById("halo");

function resizeCanvas() {
  if (p) {
    p.width = innerWidth;
    p.height = innerHeight;
  }
  if (orb) {
    orb.width = innerWidth;
    orb.height = innerHeight;
  }
  if (halo) {
    halo.width = innerWidth;
    halo.height = innerHeight;
  }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* --- PARTICLES --- */
if (p) {
  const ctxP = p.getContext("2d");

  let particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * p.width,
    y: Math.random() * p.height,
    s: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  }));

  function animateParticles() {
    ctxP.clearRect(0, 0, p.width, p.height);
    ctxP.fillStyle = "rgba(255,255,255,0.7)";
    particles.forEach((pt) => {
      pt.x += pt.vx;
      pt.y += pt.vy;
      if (pt.x < 0 || pt.x > p.width) pt.vx *= -1;
      if (pt.y < 0 || pt.y > p.height) pt.vy *= -1;

      ctxP.beginPath();
      ctxP.arc(pt.x, pt.y, pt.s, 0, Math.PI * 2);
      ctxP.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

/* --- ORB ANIMÉ --- */
if (orb) {
  const ctxO = orb.getContext("2d");
  let t = 0;

  function animateOrb() {
    ctxO.clearRect(0, 0, orb.width, orb.height);
    const x = orb.width / 2;
    const y = orb.height / 2;
    const r = 180 + Math.sin(t) * 40;

    const grad = ctxO.createRadialGradient(x, y, r * 0.3, x, y, r);
    grad.addColorStop(0, "rgba(180,100,255,0.6)");
    grad.addColorStop(1, "rgba(20,10,30,0.05)");

    ctxO.fillStyle = grad;
    ctxO.beginPath();
    ctxO.arc(x, y, r, 0, Math.PI * 2);
    ctxO.fill();

    t += 0.01;
    requestAnimationFrame(animateOrb);
  }
  animateOrb();
}

/* --- HALO --- */
if (halo) {
  const ctxH = halo.getContext("2d");
  let h = 0;

  function animateHalo() {
    ctxH.clearRect(0, 0, halo.width, halo.height);
    ctxH.strokeStyle = `rgba(255,255,255,${
      0.15 + Math.sin(h) * 0.1
    })`;
    ctxH.lineWidth = 2;

    ctxH.beginPath();
    ctxH.arc(
      halo.width / 2,
      halo.height / 2,
      240 + Math.sin(h) * 12,
      0,
      Math.PI * 2
    );
    ctxH.stroke();

    h += 0.01;
    requestAnimationFrame(animateHalo);
  }
  animateHalo();
}

/* --- PRICING TOGGLE --- */
const toggleButtons = document.querySelectorAll(".toggle-btn");
const pilotCard = document.querySelector(".pricing-pilot");
const runCard = document.querySelector(".pricing-run");

if (toggleButtons.length && pilotCard && runCard) {
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleButtons.forEach((b) =>
        b.classList.remove("toggle-btn-active")
      );
      btn.classList.add("toggle-btn-active");
      const mode = btn.dataset.mode;
      if (mode === "pilot") {
        pilotCard.classList.remove("hidden");
        runCard.classList.add("hidden");
      } else {
        pilotCard.classList.add("hidden");
        runCard.classList.remove("hidden");
      }
    });
  });
}

/* --- FAQ ACCORDION --- */
const faqItems = document.querySelectorAll(".faq-item");
if (faqItems.length) {
  faqItems.forEach((item) => {
    const q = item.querySelector(".faq-question");
    if (!q) return;
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      faqItems.forEach((i) => i.classList.remove("open"));
      if (!open) item.classList.add("open");
    });
  });
}

/* --- FAKE FORM HANDLER (juste feedback visuel) --- */
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactForm.reset();
    alert(
      "Merci ! Le formulaire est une maquette. Branchez-le à votre backend ou outil de formulaire pour le rendre réellement fonctionnel."
    );
  });
}

