/* --- REVEAL ANIMATION --- */
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
        if(e.isIntersecting) e.target.classList.add("visible");
    });
},{threshold:0.2});
reveals.forEach(r=>obs.observe(r));

/* --- SCROLL THEME SWITCH (Apple-like) --- */
window.addEventListener("scroll",()=>{
    const ratio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const brightness = 10 + ratio * 80;
    document.body.style.background = `hsl(240,10%,${brightness}%)`;
    document.body.style.color = brightness > 50 ? "black" : "white";
});

/* --- PARTICLES --- */
const p = document.getElementById("particles");
const ctxP = p.getContext("2d");
p.width = innerWidth; p.height = innerHeight;

let particles = Array.from({length:120},()=>({
    x:Math.random()*p.width,
    y:Math.random()*p.height,
    s:Math.random()*2+0.5,
    vx:(Math.random()-0.5)*0.5,
    vy:(Math.random()-0.5)*0.5
}));

function animateParticles(){
    ctxP.clearRect(0,0,p.width,p.height);
    ctxP.fillStyle="rgba(255,255,255,0.7)";
    particles.forEach(pt=>{
        pt.x+=pt.vx; pt.y+=pt.vy;
        if(pt.x<0||pt.x>p.width) pt.vx*=-1;
        if(pt.y<0||pt.y>p.height) pt.vy*=-1;

        ctxP.beginPath();
        ctxP.arc(pt.x,pt.y,pt.s,0,Math.PI*2);
        ctxP.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

/* --- ORB ANIMÉ --- */
const orb = document.getElementById("orb");
const ctxO = orb.getContext("2d");
orb.width = innerWidth; orb.height = innerHeight;

let t = 0;
function animateOrb(){
    ctxO.clearRect(0,0,orb.width,orb.height);
    const x = orb.width/2;
    const y = orb.height/2;
    const r = 180 + Math.sin(t)*40;

    const grad = ctxO.createRadialGradient(x,y,r*0.3,x,y,r);
    grad.addColorStop(0,"rgba(180,100,255,0.6)");
    grad.addColorStop(1,"rgba(20,10,30,0.05)");

    ctxO.fillStyle = grad;
    ctxO.beginPath();
    ctxO.arc(x,y,r,0,Math.PI*2);
    ctxO.fill();

    t += 0.01;
    requestAnimationFrame(animateOrb);
}
animateOrb();

/* --- HALO --- */
const halo = document.getElementById("halo");
const ctxH = halo.getContext("2d");
halo.width = innerWidth; halo.height = innerHeight;

let h=0;
function animateHalo(){
    ctxH.clearRect(0,0,halo.width,halo.height);
    ctxH.strokeStyle=`rgba(255,255,255,${0.15+Math.sin(h)*0.1})`;
    ctxH.lineWidth = 2;

    ctxH.beginPath();
    ctxH.arc(halo.width/2, halo.height/2, 240 + Math.sin(h)*12, 0, Math.PI*2);
    ctxH.stroke();

    h+=0.01;
    requestAnimationFrame(animateHalo);
}
animateHalo();

