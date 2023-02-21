const refs = {
  bodyEl: document.querySelector('body'),
  themeToggleEl: document.getElementById('js-theme-toggle'),
  iconSunEl: document.querySelector('.theme__icon--son'),
  iconMoonEl: document.querySelector('.theme__icon--moon'),
};

refs.themeToggleEl.addEventListener('click', onChangeTheme);

if (refs.themeToggleEl.checked) refs.iconSunEl.classList.add('active');

function onChangeTheme(e) {
  //   refs.bodyEl.classList.add('dark-mode');

  if (!refs.themeToggleEl.checked) {
    refs.iconSunEl.classList.remove('active');
    refs.iconMoonEl.classList.add('active');
  } else {
    refs.iconSunEl.classList.add('active');
    refs.iconMoonEl.classList.remove('active');
  }
}

export { refs };
