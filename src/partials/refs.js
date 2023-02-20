const refsEl = {
  categoryBtnEl: document.querySelector('.category__btn'),
  listConteinerEl: document.querySelector('.js-list-container'),
  btnOpenModal: document.querySelectorAll('.js-open-list'),
  viewportWidth: window.innerWidth,
  sectionRestList: document.querySelector('.rest__list'),
  categoryWrap: document.querySelector('.js-category__wrap'),
  categoryBtns: document.querySelectorAll('.js-category__btn'),
};
function viewportWidthChecjer() {
  window.addEventListener('resize', reportWindowSize);

  function reportWindowSize(ev) {
    return ev.target.innerWidth;
  }
}

export { refsEl, viewportWidthChecjer };
