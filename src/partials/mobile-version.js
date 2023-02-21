// import { debounce } from 'lodash.debounce';
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
// import bodyScrollLock from 'body-scroll-lock';
// const bodyScrollLock = require('body-scroll-lock');
// const bodyScrollLock = require('body-scroll-lock');
// const bodyScrollLock = require('body-scroll-lock');
// const disableBodyScroll = bodyScrollLock.disableBodyScroll;
// const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const mobileMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.js-open-menu');
const closeMenuBtn = document.querySelector('.js-close-menu');
const themeContainer = document.querySelector('.theme');
const seachBtn = document.querySelector('.search-field__btn');

const toggleMenu = () => {
  const isMenuOpen =
    openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  mobileMenu.classList.toggle('open-menu');
  if (themeContainer.classList.contains('mobile')) {
    themeContainer.classList.remove('mobile');
  } else if (!themeContainer.classList.contains('mobile')) {
    themeContainer.classList.add('mobile');
    // const debouncedThemeContainer = debounce(() => {
    //   themeContainer.classList.add('mobile');
    // }, 250);

    // debouncedThemeContainer();
  }

  // const scrollLockMethod = !isMenuOpen
  //   ? 'disableBodyScroll'
  //   : 'enableBodyScroll';

  // bodyScrollLock[scrollLockMethod](document.body);
};

openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  if (!e.matches) return;
  mobileMenu.classList.remove('open-menu');
  openMenuBtn.setAttribute('aria-expanded', false);
  bodyScrollLock.enableBodyScroll(document.body);
});

if (window.innerWidth < 768) {
  seachBtn.setAttribute('type', 'button');
}

export { toggleMenu };
