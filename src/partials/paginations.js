import { fetchNewsBySearch, hits } from './apiFetchNewsByValue';
import { fetchNewsBySearchAndData } from './calendar';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');
// const btnFirstPg = document.querySelector('button.first-page');
// const btnLastPg = document.querySelector('button.last-page');

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: 10,
};
if (window.innerWidth < 768) {
  valuePage.numLinksTwoSide = 0;
}

pagination();

pg.addEventListener('click', e => {
  const ele = e.target;

  Loading.standard('Loading...', {
    backgroundColor: 'rgba(0,0,0,0.8)',
  });

  if (ele.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);
    Loading.remove(1000);

    valuePage.curPage = pageNumber;

    handleButtonLeft();
    handleButtonRight();
  }
});

// DYNAMIC PAGINATION
function pagination() {
  const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;
  let range = delta + 4;
  if (window.innerWidth < 768) {
    range = delta + 2;
  }

  // use for handle visible number of links left side

  let render = '';
  let renderTwoSide = '';
  let dotLeft;
  let dot = `<li class="pg-item"data-page="${valuePage.curPage}"><a class="pg-link" href="#">...</a></li>`;
  if (valuePage.curPage <= 2) {
    dotLeft = `<li class="pg-item"data-page="${
      valuePage.curPage - 1
    }"><a class="pg-link" href="#">...</a></li>`;
  } else {
    dotLeft = `<li class="pg-item"data-page="${
      valuePage.curPage - 2
    }"><a class="pg-link" href="#">...</a></li>`;
  }

  let dotRigth = `<li class="pg-item"data-page="${
    valuePage.curPage + 2
  }"><a class="pg-link" href="#">...</a></li>`;
  let countTruncate = 0; // use for ellipsis - truncate left side or right side

  // use for truncate two side
  const numberTruncateLeft = curPage - delta;
  const numberTruncateRight = curPage + delta;

  let active = '';
  if (window.innerWidth <= 768) {
    for (let pos = 1; pos <= totalPages; pos++) {
      active = pos === curPage ? 'active' : '';

      // truncate
      if (totalPages >= 2 * range - 1) {
        if (
          numberTruncateLeft > 1 &&
          numberTruncateRight < totalPages - 1 + 1
        ) {
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
  } else {
    for (let pos = 1; pos <= totalPages; pos++) {
      active = pos === curPage ? 'active' : '';

      // truncate
      if (totalPages >= 2 * range - 1) {
        if (
          numberTruncateLeft > 3 &&
          numberTruncateRight < totalPages - 3 + 1
        ) {
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
  }

  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) +
      dotLeft +
      renderTwoSide +
      dotRigth +
      renderPage(totalPages);
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
    // цієї фкції нема
  } else if (element.classList.contains('last-page')) {
    valuePage.curPage = 10;
    // цієї фкції нема
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

  const dateData = document.querySelector('.calendar__input').value;
  const search = document.querySelector('.page-header__search-input').value;

  let realDate;
  if (dateData) {
    realDate = dateData.split('/').reverse().join('');
  }
  if (!realDate && !search) {
    return;
  }

  if ((search && realDate) || realDate) {
    fetchNewsBySearchAndData(search, realDate, valuePage.curPage - 1);
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  } else {
    fetchNewsBySearch(search, valuePage.curPage - 1);
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }
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
