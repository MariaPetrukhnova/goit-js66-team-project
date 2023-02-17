const refs = {
  search: document.querySelector('.js-search'),
  burgerMenu: document.querySelector('.js-menu-open'),
  searchInput: document.querySelector('.js-search-input'),
  body: document.querySelector('.body'),
};

refs.search.addEventListener('click', onOpenSearchInput);
// refs.burgerMenu.addEventListener('click', onOpenMenu);

function onOpenSearchInput(e) {
  e.preventDefault();

  refs.searchInput.innerHTML =
    '<input type="search" placeholder="Search" class="page-header__search-input">';
}

function onOpenMenu(e) {
  e.preventDefault();

  refs.body.innerHTML = `<ul>
        < li >
        <a>fgggf</a>
    </>
    </ul > `;
}

export { refs, onOpenSearchInput, onOpenMenu };
