const orb = document.getElementById("orb");
const ctx = orb.getContext("2d");

function resize() {
    orb.width = window.innerWidth;
    orb.height = window.innerHeight;
}
resize();
window.onresize = resize;

let t = 0;

function animate() {
    ctx.clearRect(0,0,orb.width, orb.height);

    const x = orb.width / 2;
    const y = orb.height / 2;
    const r = 250 + Math.sin(t) * 30;

    const g = ctx.createRadialGradient(x,y,r*0.2, x,y,r);
    g.addColorStop(0, "rgba(180,180,255,0.7)");
    g.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fill();

    t += 0.01;
    requestAnimationFrame(animate);
}

animate();
