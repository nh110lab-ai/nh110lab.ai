/* ============================================================
   1. REVEAL ON SCROLL
============================================================ */
const reveals = document.querySelectorAll(".reveal, .section-title");
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
}, {threshold:0.15});
reveals.forEach(r=>observer.observe(r));

/* ============================================================
   2. HEADER SHRINK ON SCROLL
============================================================ */
const header = document.querySelector("header");
window.addEventListener("scroll", ()=>{
    if(window.scrollY > 40) header.classList.add("active");
    else header.classList.remove("active");
});

/* ============================================================
   3. FAQ ACCORDION
============================================================ */
document.querySelectorAll(".faq-item").forEach(item=>{
    item.addEventListener("click", ()=> item.classList.toggle("active"));
});

/* ============================================================
   4. AUTO DARK MODE — Apple Intelligence Style
============================================================ */
let lastToggle = 0;
window.addEventListener("scroll", ()=>{
    const pos = window.scrollY;
    const vh = window.innerHeight;
    const sectionIndex = Math.floor(pos / vh) % 2;

    if(sectionIndex !== lastToggle){
        lastToggle = sectionIndex;
        if(sectionIndex === 1){
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }
});

/* ============================================================
   5. CURSOR HALO — IA Glow
============================================================ */
const halo = document.querySelector(".cursor-halo");
document.addEventListener("mousemove",(e)=>{
    halo.style.left = e.clientX + "px";
    halo.style.top = e.clientY + "px";
});

/* ============================================================
   6. 3D TILT CARDS — VisionOS Effect
============================================================ */
document.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("mousemove",(e)=>{
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (y - 0.5) * 12;
        const tiltY = (x - 0.5) * -12;

        card.style.transform =
            `perspective(900px) 
             rotateX(${tiltX}deg)
             rotateY(${tiltY}deg)
             scale(1.04)`;
    });

    card.addEventListener("mouseleave",()=>{
        card.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
});

/* ============================================================
   7. SIRI PARTICLES — Floating IA Dots
============================================================ */
const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "-4";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let w, h;

function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = [];
const COUNT = 60;

function createParticle(){
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 2,
        color: Math.random() > 0.66
            ? "rgba(157,107,255,0.7)"
            : Math.random() > 0.33
            ? "rgba(0,198,255,0.7)"
            : "rgba(255,77,222,0.7)"
    };
}

for(let i=0; i<COUNT; i++) particles.push(createParticle());

function animate(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
        p.x += p.vx;
        p.y += p.vy;

        if(p.x<0 || p.x>w) p.vx *= -1;
        if(p.y<0 || p.y>h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();
