// 🔹 Menu burger
const burger = document.querySelector('.burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('show');
});

// 🔹 Smooth scroll pour tous les liens internes
document.querySelectorAll('#nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 70, // Ajuste pour la navbar fixe
      behavior: 'smooth'
    });

    // Ferme le menu mobile après clic
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      burger.classList.remove('active');
    }
  });
});

// 🔹 Reveal sections animation
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // une seule fois pour optimisation
      }
    });
  },
  {
    threshold: 0.2 // déclenche quand 20% visible
  }
);

reveals.forEach(el => revealObserver.observe(el));

// 🔹 Précharger images pour un rendu plus rapide
const images = document.querySelectorAll('header, .profile-container img');
images.forEach(img => {
  const src = img.tagName === 'IMG' ? img.src : img.style.backgroundImage.slice(5, -2);
  const preImg = new Image();
  preImg.src = src;
});
