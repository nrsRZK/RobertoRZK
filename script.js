// --- Menu burger ---
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navLinks.classList.toggle("show");
});

// Fermer le menu au clic sur un lien
document.querySelectorAll("#nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navLinks.classList.remove("show");
  });
});

// --- Animation de révélation au scroll ---
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("visible");
    } else {
      reveals[i].classList.remove("visible");
    }
  }
});
// Forcer une première vérification à l'ouverture de la page
window.addEventListener("load", () => {
  window.dispatchEvent(new Event("scroll"));
});
