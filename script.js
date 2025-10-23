document.addEventListener("DOMContentLoaded", () => {
  // Reveal elements au scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Scroll smooth pour tous les liens internes
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if(target){
        target.scrollIntoView({ behavior: "smooth" });
      }

      // Si menu burger ouvert, le fermer après clic
      const navLinks = document.getElementById("nav-links");
      const burger = document.getElementById("burger");
      if(navLinks.classList.contains("show")){
        navLinks.classList.remove("show");
        burger.classList.remove("active");
        // Remet le header à sa place
        document.querySelector("header").style.paddingTop = "0";
      }
    });
  });

  // Burger menu avec décalage du header
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("nav-links");
  const header = document.querySelector("header");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navLinks.classList.toggle("show");

    // Décale le header pour ne pas cacher le menu
    if(navLinks.classList.contains("show")){
      header.style.paddingTop = "120px"; // ajuste selon la hauteur du menu
    } else {
      header.style.paddingTop = "0";
    }
  });
});
