/* FOND ANIMÉ + PARTICULES + ORB */
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*2+1,
        vx: (Math.random()-0.5)*0.4,
        vy: (Math.random()-0.5)*0.4
    });
}

function animateBackground(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // halo
    const grd = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 100,
        canvas.width/2, canvas.height/2, 600
    );
    grd.addColorStop(0,"rgba(255,255,255,0.10)");
    grd.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;

        if(p.x<0||p.x>canvas.width) p.vx*=-1;
        if(p.y<0||p.y>canvas.height) p.vy*=-1;

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(255,255,255,0.6)";
        ctx.fill();
    });

    requestAnimationFrame(animateBackground);
}
animateBackground();

/* MODE CLAIR/SOMBRE DYNAMIQUE (Option C) */
function updateTheme(){
    const scrollY = window.scrollY;
    const max = document.body.scrollHeight - innerHeight;
    const ratio = scrollY / max; // 0 → haut clair, 1 → bas sombre

    if(ratio < 0.25) document.body.className = "light-mode";
    else if(ratio < 0.55) document.body.className = "";
    else document.body.className = "dark-mode";
}
window.addEventListener("scroll", updateTheme);
updateTheme();

/* ANIMATION SECTION REVEAL */
const sections = document.querySelectorAll(".section-fade");
function revealSections(){
    sections.forEach(sec=>{
        const rect = sec.getBoundingClientRect();
        if(rect.top < window.innerHeight - 100){
            sec.classList.add("visible");
        }
    });
}
window.addEventListener("scroll", revealSections);
revealSections();

/* PARALLAXE 3D */
document.addEventListener("mousemove", e=>{
    const x = (e.clientX / innerWidth - 0.5) * 20;
    const y = (e.clientY / innerHeight - 0.5) * 20;
    document.getElementById("theme-wrapper").style.transform =
        `translate(${x}px, ${y}px)`;
});

/* ASSISTANT IA */
const aiBtn = document.getElementById("ai-button");
const aiPanel = document.getElementById("ai-panel");

aiBtn.onclick = () => {
    aiPanel.style.display = aiPanel.style.display==="flex" ? "none" : "flex";
};
