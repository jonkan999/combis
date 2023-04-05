///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
  /*   var element = document.getElementsByClassName("hero-brand-box");
  element[0].classList.toggle("hero-brand-box--closed"); */
});
