/* ================================ */
/* REVEAL ELEMENTS WHEN SCROLLING  */
/* ================================ */
const reveals = document.querySelectorAll('.reveal');

const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
    });
}, { threshold: 0.2 });

reveals.forEach(r => obs.observe(r));



/* ================================ */
/* SMOOTH BACKGROUND SCROLL COLOR  */
/* ================================ */
window.addEventListener("scroll", () => {
    const ratio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const brightness = 8 + ratio * 85;

    document.body.style.background = `hsl(240, 10%, ${brightness}%)`;
    document.body.style.color = brightness > 50 ? "#111" : "white";
});



/* ================================ */
/* PARTICLES LAYER (BG-PARTICLES)  */
/* ================================ */
const p = document.getElementById("bg-particles");
const ctxP = p.getContext("2d");

function resizeParticles() {
    p.width = innerWidth;
    p.height = innerHeight;
}
resizeParticles();
window.addEventListener("resize", resizeParticles);

let particles = Array.from({ length: 150 }, () => ({
    x: Math.random() * p.width,
    y: Math.random() * p.height,
    s: Math.random() * 2 + 0.6,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
}));

function animateParticles() {
    ctxP.clearRect(0, 0, p.width, p.height);
    ctxP.fillStyle = "rgba(255,255,255,0.7)";
    particles.forEach(pt => {
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



/* ================================ */
/* ORB (Aurora Core Glow)           */
/* ================================ */
const orb = document.getElementById("bg-orb");
const ctxO = orb.getContext("2d");

function resizeOrb() {
    orb.width = innerWidth;
    orb.height = innerHeight;
}
resizeOrb();
window.addEventListener("resize", resizeOrb);

let tOrb = 0;

function animateOrb() {
    ctxO.clearRect(0, 0, orb.width, orb.height);

    const x = orb.width / 2;
    const y = orb.height / 2;
    const r = 220 + Math.sin(tOrb) * 50;

    const grad = ctxO.createRadialGradient(x, y, r * 0.3, x, y, r);
    grad.addColorStop(0, "rgba(180,100,255,0.6)");
    grad.addColorStop(1, "rgba(20,10,30,0)");

    ctxO.fillStyle = grad;
    ctxO.beginPath();
    ctxO.arc(x, y, r, 0, Math.PI * 2);
    ctxO.fill();

    tOrb += 0.01;
    requestAnimationFrame(animateOrb);
}
animateOrb();



/* ================================ */
/* HALO RING (Apple AURA effect)   */
/* ================================ */
const halo = document.getElementById("bg-halo");
const ctxH = halo.getContext("2d");

function resizeHalo() {
    halo.width = innerWidth;
    halo.height = innerHeight;
}
resizeHalo();
window.addEventListener("resize", resizeHalo);

let tHalo = 0;

function animateHalo() {
    ctxH.clearRect(0, 0, halo.width, halo.height);

    ctxH.strokeStyle = `rgba(255,255,255,${0.18 + Math.sin(tHalo)*0.10})`;
    ctxH.lineWidth = 2;

    ctxH.beginPath();
    ctxH.arc(
        halo.width / 2,
        halo.height / 2,
        270 + Math.sin(tHalo) * 15,
        0,
        Math.PI * 2
    );
    ctxH.stroke();

    tHalo += 0.01;
    requestAnimationFrame(animateHalo);
}
animateHalo();



/* ================================ */
/*  AGENT IA INTERACTIF            */
/* ================================ */

const aiAgent = document.getElementById("ai-agent");
const chatPanel = document.getElementById("chat-panel");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");

let chatOpen = false;

if (aiAgent) {
    aiAgent.addEventListener("click", () => {
        chatOpen = !chatOpen;
        chatPanel.style.display = chatOpen ? "flex" : "none";
        if (chatOpen) chatInput.focus();
    });
}

/* ADD MESSAGE TO CHAT */
function addMessage(text, from = "bot") {
    const msg = document.createElement("div");
    msg.classList.add("msg");
    if (from === "me") msg.classList.add("me");
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* SIMPLE LOCAL AI RESPONSE */
function iaRespond(userMsg) {
    userMsg = userMsg.toLowerCase();

    if (userMsg.includes("bonjour") || userMsg.includes("salut")) {
        return "Bonjour ! 😊 Je suis l’Agent Aurora IA. Que veux-tu automatiser ?";
    }
    if (userMsg.includes("agent")) {
        return "Je peux créer un agent autonome : commercial, CRM, analyste ou opérations ! 💼";
    }
    if (userMsg.includes("prix") || userMsg.includes("tarif")) {
        return "Voici les tarifs : Starter 49€, Business 149€, Entreprise sur mesure.";
    }
    if (userMsg.includes("prospection")) {
        return "Je peux faire de la prospection 100% automatique : LinkedIn + Email + WhatsApp 🔥";
    }
    return "Intéressant ! Décris-moi ce que tu veux que ton agent fasse exactement.";
}

/* SEND MESSAGE */
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
        const text = chatInput.value.trim();
        chatInput.value = "";

        addMessage(text, "me");

        setTimeout(() => {
            addMessage(iaRespond(text), "bot");
        }, 500);
    }
});
