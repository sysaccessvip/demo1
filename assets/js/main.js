// main.js: pequeños comportamientos UI para index.html

document.addEventListener('DOMContentLoaded', () => {
  // año del footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // menú móvil simple
  const navToggle = document.getElementById('navToggle');
  navToggle && navToggle.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    if (nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });

  // Contact form: demo (evita reload)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = fd.get('name');
      alert(`Gracias ${name}. Tu mensaje fue enviado (demo). Revisaremos y responderemos a tu email.`);
      contactForm.reset();
    });
  }

  // pequeñas optimizaciones: lazy images (si aplica)
  const imgs = document.querySelectorAll('img[data-src]');
  imgs.forEach(img => {
    img.src = img.dataset.src;
  });
});
