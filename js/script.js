/* ================================================
   NH110LAB.ai — Animations Futuristes Premium
   ================================================ */

/* 1. REVEAL ANIMATION (fade-up) */
const reveals = document.querySelectorAll('.reveal');
const slideReveals = document.querySelectorAll('.reveal-slide');
const zoomReveals = document.querySelectorAll('.reveal-zoom');

function revealElements(scrollPos) {
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
            el.classList.add('visible');
        }
    });

    slideReveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
            el.classList.add('visible');
        }
    });

    zoomReveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
            el.classList.add('visible');
        }
    });
}

/* 2. MODE CLAIR → SOMBRE PROGRESSIF AU SCROLL */
function handleScrollDarkMode() {
    const scrollY = window.scrollY;
    const pageHeight = document.body.scrollHeight - window.innerHeight;

    // Pourcentage du scroll
    const progress = scrollY / pageHeight;

    if (progress > 0.23) {
        document.body.classList.add('scroll-dark');
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('scroll-dark');
        document.body.classList.remove('dark-mode');
    }
}

/* 3. PARALLAX FUTURISTE SUR LES ORBES */
const orbs = document.querySelectorAll('.hero-orb');

function parallaxOrbs() {
    const scrollY = window.scrollY;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.15;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
}

/* 4. SCROLL LISTENER */
window.addEventListener('scroll', () => {
    revealElements();
    handleScrollDarkMode();
    parallaxOrbs();
});

/* 5. ON LOAD → lancer reveals initiaux */
window.addEventListener('load', () => {
    setTimeout(() => {
        revealElements();
    }, 300);
});
