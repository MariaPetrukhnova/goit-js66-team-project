import { fetchNewsBySearch, hits } from './apiFetchNewsByValue';
const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');
// const btnFirstPg = document.querySelector('button.first-page');
// const btnLastPg = document.querySelector('button.last-page');
const inputs = document.getElementById('search-field__input');
const text = document.querySelector('.search-field');

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: 20,
};

let search = '';
text.addEventListener('submit', inputText);
function inputText(event) {
  event.preventDefault();
  search = inputs.value;
  if (hits > 1000) {
    valuePage.totalPages = 99;
  } else valuePage.totalPages = hits / 10;
}

pagination();

pg.addEventListener('click', e => {
  const ele = e.target;

  if (ele.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);

    // const search = searchInput.value;
    valuePage.curPage = pageNumber;
    pagination(valuePage);
    handleButtonLeft();
    handleButtonRight();
    window.scroll(0, 0);
    // fetchNewsBySearch(search, valuePage.curPage - 1);
  }
});

// DYNAMIC PAGINATION
function pagination() {
  const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

  let range = delta; // use for handle visible number of links left side
  if (window.innerWidth > 768) {
    range = delta + 4;
  }

  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="pg-item"><a class="pg-link">...</a></li>`;
  let countTruncate = 0; // use for ellipsis - truncate left side or right side

  // use for truncate two side
  const numberTruncateLeft = curPage - delta;
  const numberTruncateRight = curPage + delta;

  let active = '';
  for (let pos = 1; pos <= totalPages; pos++) {
    active = pos === curPage ? 'active' : '';

    // truncate
    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
        // truncate 2 side
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          renderTwoSide += renderPage(pos, active);
        }
      } else {
        // truncate left side or right side
        if (
          (curPage < range && pos <= range) ||
          (curPage > totalPages - range && pos >= totalPages - range + 1) ||
          pos === totalPages ||
          pos === 1
        ) {
          render += renderPage(pos, active);
        } else {
          countTruncate++;
          if (countTruncate === 1) render += dot;
        }
      }
    } else {
      // not truncate
      render += renderPage(pos, active);
    }
  }

  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
    pg.innerHTML = renderTwoSide;
  } else {
    pg.innerHTML = render;
  }
}

function renderPage(index, active = '') {
  return ` <li class="pg-item ${active}" data-page="${index}">
        <a class="pg-link" href="#">${index}</a>
    </li>`;
}

document
  .querySelector('.page-container')
  .addEventListener('click', function (e) {
    handleButton(e.target);
  });

function handleButton(element) {
  if (element.classList.contains('first-page')) {
    valuePage.curPage = 1;
  } else if (element.classList.contains('last-page')) {
    valuePage.curPage = valuePage.totalPages;
  } else if (element.classList.contains('prev-page')) {
    valuePage.curPage--;
    handleButtonLeft();
    btnNextPg.disabled = false;
    // btnLastPg.disabled = false;
  } else if (element.classList.contains('next-page')) {
    valuePage.curPage++;
    handleButtonRight();
    btnPrevPg.disabled = false;
    // btnFirstPg.disabled = false;
  }
  pagination();
  console.log(search);
  fetchNewsBySearch(search, valuePage.curPage - 1);
  window.scroll(0, 0);
}
function handleButtonLeft() {
  if (valuePage.curPage === 1) {
    btnPrevPg.disabled = true;
    // btnFirstPg.disabled = true;
  } else {
    btnPrevPg.disabled = false;
    // btnFirstPg.disabled = false;
  }
}
function handleButtonRight() {
  if (valuePage.curPage === valuePage.totalPages) {
    btnNextPg.disabled = true;
    // btnLastPg.disabled = true;
  } else {
    btnNextPg.disabled = false;
    // btnLastPg.disabled = false;
  }
}

export { valuePage, pagination };
