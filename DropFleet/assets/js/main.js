const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.co+ntains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500 * 0.6, 
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000 * 0.6, 
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1500 * 0.6, 
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 2000 * 0.6, 
});

ScrollReveal().reveal(".service__card", {
  duration: 1000 * 0.6, 
  interval: 500 * 0.6, 
});

ScrollReveal().reveal(".destination__card", {
  ...scrollRevealOption,
  interval: 500 * 0.6, 
});

ScrollReveal().reveal(".trip__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".trip__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500 * 0.6, 
});
ScrollReveal().reveal(".trip__content .section__header", {
  ...scrollRevealOption,
  delay: 1000 * 0.6, 
});
ScrollReveal().reveal(".trip__list li", {
  ...scrollRevealOption,
  delay: 1500 * 0.6, 
  interval: 500 * 0.6, 
});

ScrollReveal().reveal(".client__content .section__subheader", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".client__content .section__header", {
  ...scrollRevealOption,
  delay: 500 * 0.6, 
});

const swiper = new Swiper(".swiper", {
  direction: "vertical",
  autoHeight: true,
  slidesPerView: 1,
});

