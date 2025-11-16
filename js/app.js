// NH110LAB.ai — JS interactions

// Smooth scroll for internal nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Header scroll effect
const header = document.querySelector('.header');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (!button || !answer) return;

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // close others
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('open');
      }
    });
    if (!isOpen) {
      item.classList.add('open');
    } else {
      item.classList.remove('open');
    }
  });
});

// Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealElements.length) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => observer.observe(el));
} else {
  // Fallback: show all
  revealElements.forEach(el => el.classList.add('visible'));
}
