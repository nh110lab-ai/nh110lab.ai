/* --- REVEAL ON SCROLL --- */
const reveals = document.querySelectorAll(".reveal");
const obser = new IntersectionObserver((e)=>{
    e.forEach(x=>{ if(x.isIntersecting) x.target.classList.add("visible"); });
},{threshold:0.2});
reveals.forEach(r=>obser.observe(r));

/* --- APPLE FLOW GRADIENT BACKGROUND --- */
const canvas = document.getElementById("flow-bg");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
window.onresize = resize;

let t = 0;

function flow(){
    t += 0.003;

    const g = ctx.createLinearGradient(
        0, 0,
        canvas.width, canvas.height
    );

    g.addColorStop(0, `hsl(${200 + Math.sin(t)*40}, 90%, 92%)`);
    g.addColorStop(1, `hsl(${260 + Math.cos(t)*40}, 95%, 88%)`);

    ctx.fillStyle = g;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    requestAnimationFrame(flow);
}
flow();

/* --- AGENT IA --- */
const bubble = document.getElementById("agent-bubble");
const windowIA = document.getElementById("agent-window");
const inputIA = document.getElementById("agent-input");
const msgIA = document.getElementById("agent-messages");

bubble.onclick = ()=>{
    windowIA.style.display = windowIA.style.display==="flex" ? "none" : "flex";
};

function aiReply(text){
    const div = document.createElement("div");
    div.style.background="#f1f1f1";
    div.style.padding="10px";
    div.style.margin="5px 0";
    div.style.borderRadius="12px";
    div.textContent = "🤖 " + text;
    msgIA.appendChild(div);
    msgIA.scrollTop = msgIA.scrollHeight;
}

inputIA.addEventListener("keydown", e=>{
    if(e.key==="Enter" && inputIA.value.trim()!==""){
        const userMsg = document.createElement("div");
        userMsg.style.background="#007aff";
        userMsg.style.color="white";
        userMsg.style.padding="10px";
        userMsg.style.margin="5px 0";
        userMsg.style.borderRadius="12px";
        userMsg.style.textAlign="right";
        userMsg.textContent = inputIA.value;
        msgIA.appendChild(userMsg);

        aiReply("Je suis votre agent IA. Que souhaitez-vous automatiser ?");

        inputIA.value = "";
    }
});
