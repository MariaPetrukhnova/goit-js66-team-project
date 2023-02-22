const refs = {
  bodyEl: document.querySelector('body'),
  openMenuBtn: document.getElementById('js-open-menu'),
  closeMenuBtn: document.getElementById('js-close-menu'),
  themeContainer: document.getElementById('theme'),
  mobileMenu: document.getElementById('js-menu-container'),
  searchBtn: document.getElementById('form-btn'),
};

refs.openMenuBtn.addEventListener('click', toggleMenu);
refs.closeMenuBtn.addEventListener('click', toggleMenu);

function toggleMenu(e) {
  const isMenuStatus =
    refs.openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  refs.openMenuBtn.setAttribute('aria-expanded', !isMenuStatus);
  refs.mobileMenu.classList.toggle('open-menu');
  refs.themeContainer.classList.toggle('mobile');
  refs.bodyEl.classList.toggle('scroll-lock');
}

if (window.innerWidth < 768) {
  refs.searchBtn.setAttribute('type', 'button');
}

window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  if (!e.matches) return;
  refs.mobileMenu.classList.remove('open-menu');
  refs.openMenuBtn.setAttribute('aria-expanded', false);
  refs.bodyEl.classList.remove('scroll-lock');
});

export { toggleMenu };
