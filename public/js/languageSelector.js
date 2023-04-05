const languageSelector = document.querySelector("#languageSelector");
const languageOptions = document.querySelector("#languageOptions");

languageSelector.addEventListener("click", function () {
  languageOptions.classList.toggle("show");
  languageOptions.style.zIndex = "1";
  languageOptions.style.opacity = "1";
});

window.addEventListener("click", function (event) {
  if (
    !event.target.matches("#languageSelector") &&
    !event.target.matches("#languageSelector *")
  ) {
    languageOptions.classList.remove("show");
    languageOptions.style.zIndex = "-1";
    languageOptions.style.opacity = "0";
  }
});
