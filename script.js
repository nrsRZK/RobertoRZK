document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Reveal elements au scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // 🔹 Scroll smooth pour tous les liens internes
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if(target){
        target.scrollIntoView({ behavior: "smooth" });
      }

      // Ferme le menu burger si ouvert
      const navLinks = document.getElementById("nav-links");
      const burger = document.getElementById("burger");
      if(navLinks.classList.contains("show")){
        navLinks.classList.remove("show");
        burger.classList.remove("active");
      }
    });
  });

  // 🔹 Burger menu
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("nav-links");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navLinks.classList.toggle("show");
  });

  // 🔹 Changement de style navbar au scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if(window.scrollY > 50){
      navbar.style.background = "rgba(13,13,13,0.95)";
    } else {
      navbar.style.background = "rgba(13,13,13,0.8)";
    }
  });
});
