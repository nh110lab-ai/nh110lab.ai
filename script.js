/*********** Animation du fond NOIR & BLANC ***********/
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let t = 0;

function draw() {
    t += 0.01;
    for (let x = 0; x < canvas.width; x += 10) {
        for (let y = 0; y < canvas.height; y += 10) {
            const gray = Math.floor(128 + 127 * Math.sin((x+y)*0.01 + t));
            ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
            ctx.fillRect(x, y, 10, 10);
        }
    }
    requestAnimationFrame(draw);
}
draw();

/*********** Interaction souris pour effet vivant ***********/
document.addEventListener("mousemove", (e) => {
    const dx = (e.clientX / window.innerWidth - 0.5) * 20;
    const dy = (e.clientY / window.innerHeight - 0.5) * 20;
    canvas.style.transform = `translate(${dx}px, ${dy}px)`;
});
