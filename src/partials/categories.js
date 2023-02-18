const categoryBtnEl = document.querySelector(".category__btn");
const listConteinerEl = document.querySelector(".js-list-container");
categoryBtnEl.addEventListener("click", handleClick);
function handleClick() {
    categoryBtnEl.classList.toggle("isActiveBtn")
    listConteinerEl.classList.toggle("is-open");
    listConteinerEl.classList.toggle("list-container--animation");

}