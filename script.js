// Fade-up animation observer
const faders = document.querySelectorAll(".fade-up");

const appearOptions = {
  threshold: 0.2,
};

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, appearOptions);

faders.forEach(fade => {
  appearOnScroll.observe(fade);
});
