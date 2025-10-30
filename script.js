/* ===== Preloader logic ===== */
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 200);
  });

  setTimeout(() => {
    if (!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
    }
  }, 10000);
})();

/* ===== Lazyload images ===== */
(function () {
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '100px 0px' });
    lazyImgs.forEach(img => io.observe(img));
  } else {
    lazyImgs.forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
  }
})();

/* ===== Thème clair/sombre avec mémorisation ===== */
(function () {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '☀️';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = '🌙';
    }
  });
})();

/* ===== Menu burger ===== */
(function () {
  const burger = document.querySelector('.burger');
  const navLinks = document.getElementById('nav-links');
  if (!burger || !navLinks) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('show');
  });

  navLinks.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });

      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        burger.classList.remove('active');
      }
    });
  });
})();

/* ===== Reveal sections animation ===== */
(function () {
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach(el => revealObserver.observe(el));
})();

/* ===== Précharger images ===== */
(function () {
  const images = document.querySelectorAll('header, .profile-container img');
  images.forEach(img => {
    const src = img.tagName === 'IMG' ? img.src : img.style.backgroundImage.slice(5, -2);
    const preImg = new Image();
    preImg.src = src;
  });
})();

/* ===== Formulaire de contact EmailJS ===== */
(function () {
  const form = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (!form || !formMessage) return;

  // Configure tes identifiants EmailJS
  const SERVICE_ID = 'service_13oiayu';
  const TEMPLATE_ID = 'template_vdqqujd'; // remplace par ton template
  const PUBLIC_KEY = 'deYgNLIZcGngQuYIG';   // remplace par ta clé publique

  // Initialiser EmailJS
  emailjs.init('deYgNLIZcGngQuYIG');

  const showMessage = (msg, type = 'success') => {
    formMessage.textContent = msg;
    formMessage.className = `form-message ${type}`;
    setTimeout(() => {
      formMessage.classList.remove(type);
      formMessage.textContent = '';
    }, 5000);
  };

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nom = form.nom.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!nom) return showMessage('Veuillez entrer votre nom.', 'error');
    if (!validateEmail(email)) return showMessage('Veuillez entrer un email valide.', 'error');
    if (!message) return showMessage('Veuillez entrer votre message.', 'error');

    // Envoi EmailJS
    const templateParams = { from_name: nom, from_email: email, message: message };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then(() => {
        showMessage('Message envoyé avec succès ! ✅', 'success');
        form.reset();
      })
      .catch(err => {
        console.error(err);
        showMessage('Erreur lors de l’envoi, réessayez.', 'error');
      });
  });
})();
