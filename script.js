/* 1 — MODE CLAIR/SOMBRE AUTOMATIQUE AU SCROLL */
window.addEventListener("scroll", () => {
    const wrapper = document.getElementById("theme-wrapper");

    if (window.scrollY > window.innerHeight * 0.7) {
        wrapper.classList.add("light");
    } else {
        wrapper.classList.remove("light");
    }
});

/* 2 — FOND ORB ANIMÉ TYPE APPLE INTELLIGENCE */
const orb = document.getElementById("orb");
const octx = orb.getContext("2d");

function resize(){
    orb.width = window.innerWidth;
    orb.height = window.innerHeight;
}
resize();
window.onresize = resize;

let angle = 0;
function animateOrb(){
    octx.clearRect(0,0,orb.width,orb.height);

    const x = orb.width/2 + Math.cos(angle)*80;
    const y = orb.height/2 + Math.sin(angle)*80;

    const gradient = octx.createRadialGradient(x,y,40,x,y,300);
    gradient.addColorStop(0,"rgba(255,255,255,0.4)");
    gradient.addColorStop(1,"rgba(255,255,255,0)");

    octx.fillStyle = gradient;
    octx.fillRect(0,0,orb.width,orb.height);

    angle += 0.01;
    requestAnimationFrame(animateOrb);
}
animateOrb();

/* 3 — PARTICULES INTERACTIVES */
const particles = document.getElementById("particles");
const pctx = particles.getContext("2d");
particles.width = innerWidth;
particles.height = innerHeight;

let p = [];
for(let i=0;i<60;i++){
    p.push({
        x:Math.random()*innerWidth,
        y:Math.random()*innerHeight,
        s:Math.random()*2+0.5,
        v:Math.random()*1+0.2
    });
}

function drawParticles(){
    pctx.clearRect(0,0,innerWidth,innerHeight);
    p.forEach(point=>{
        pctx.fillStyle="rgba(255,255,255,0.6)";
        pctx.beginPath();
        pctx.arc(point.x,point.y,point.s,0,Math.PI*2);
        pctx.fill();

        point.y += point.v;
        if(point.y > innerHeight) point.y = -10;
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();
