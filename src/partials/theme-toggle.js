const refs = {
  bodyEl: document.querySelector('body'),
  changeBtnEl: document.getElementById('switch-checkbox'),
  themeElDark: document.getElementById('theme__dark'),
  themeElLigth: document.getElementById('theme__light'),
};

addDarkClassToHTML();

refs.changeBtnEl.addEventListener('click', changeTheme);

function changeTheme() {
  refs.bodyEl.classList.toggle('dark-mode');
  refs.themeElDark.classList.toggle('opacityForDark');
  refs.themeElLigth.classList.toggle('opacityForDark');

  localStorage.setItem('theme', refs.bodyEl.classList.contains('dark-mode') ? 'dark' : '');
}

function addDarkClassToHTML() {
  if (localStorage.getItem('theme') === 'dark') {
    refs.bodyEl.classList.add('dark-mode');
    refs.changeBtnEl.checked = true;
  }
}

export { changeTheme, addDarkClassToHTML };
