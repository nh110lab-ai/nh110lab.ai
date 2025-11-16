window.addEventListener("scroll", () => {
    const max = document.body.scrollHeight - window.innerHeight;
    const ratio = window.scrollY / max;  // 0 → 1

    // Blanc → Noir
    const light = Math.round(100 - ratio * 100);
    document.body.style.background = `hsl(0, 0%, ${light}%)`;

    // Texte noir → blanc progressif
    document.body.style.color = light < 50 ? "white" : "black";

    // Bouton CTA
    const ctas = document.querySelectorAll(".cta");
    ctas.forEach(btn => {
        btn.style.background = light < 50 ? "white" : "black";
        btn.style.color = light < 50 ? "black" : "white";
    });
});
