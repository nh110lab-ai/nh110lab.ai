/* CALCULATEUR */
function calculateTime() {
    const minutes = parseInt(document.getElementById("minutes-per-day").value);
    const tasks = parseInt(document.getElementById("task-count").value);

    const total = minutes * tasks * 30;

    document.getElementById("calc-result").innerText =
        "⏳ " + total + " minutes économisées / mois (~" + Math.round(total/60) + "h)";
}

/* FAQ */
document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
        const answer = btn.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
});

/* THEME */
document.getElementById("theme-toggle").onclick = () => {
    const root = document.documentElement;
    const mode = root.getAttribute("data-theme");
    root.setAttribute("data-theme", mode === "dark" ? "light" : "dark");
};

/* CANVAS ORB, HALO & PARTICLES (simplifié mais premium) */
const canvas = document.getElementById("orb");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();

let angle = 0;
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    const x = canvas.width/2;
    const y = canvas.height/2;

    const radius = 150 + Math.sin(angle)*20;

    const gradient = ctx.createRadialGradient(x,y,20,x,y,radius);
    gradient.addColorStop(0, "rgba(157,92,255,0.9)");
    gradient.addColorStop(1, "rgba(157,92,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fill();

    angle += 0.01;

    requestAnimationFrame(animate);
}
animate();
