/* ============================================================
   SCROLL REVEAL — Animation douce sur toutes les sections
============================================================ */
const revealElements = document.querySelectorAll('.section-title, .section-desc, .card, .agent-img, .price-card, .faq-item, .contact-box');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.style.transitionDelay = "0.1s";
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


/* ============================================================
   HEADER — Change style en scroll (VisionOS style)
============================================================ */
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/* ============================================================
   DARK / LIGHT AUTO — Change toutes les 1 sections
============================================================ */
const body = document.body;

let lastMode = 0;

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const viewport = window.innerHeight;

    // Mode change every viewport height
    const sectionIndex = Math.floor(scrollY / viewport);

    if (sectionIndex % 2 === 1 && lastMode !== 1) {
        body.classList.add("dark");
        lastMode = 1;
    } 
    else if (sectionIndex % 2 === 0 && lastMode !== 0) {
        body.classList.remove("dark");
        lastMode = 0;
    }
});


/* ============================================================
   FAQ — Accordéon
============================================================ */
document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});


/* ============================================================
   PARALLAX ORB — Effet Apple Intelligence
============================================================ */
const orb = document.querySelector(".orb-bg");

document.addEventListener("mousemove", (e) => {
    if (!orb) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    orb.style.transform = `translate(${x}px, ${y}px) scale(1.15)`;
});


/* ============================================================
   SMOOTH SCROLL — Pour les liens nav
============================================================ */
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const id = link.getAttribute("href").replace("#", "");
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    });
});
