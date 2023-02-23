import { fetchNewsBySearch, hits } from './apiFetchNewsByValue';
import {fetchNewsBySearchAndData} from './calendar';
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


pagination();

pg.addEventListener('click', e => {
  const ele = e.target;

  if (ele.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);

    const search = document.querySelector(
      '.page-header__search-input'
    ).value;  
    const dateData = document.querySelector(".calendar__input").value;
    console.log(search);
    let data;
    if(dateData){
      // console.log(dateData);
      data = dateData.split('/').reverse().join('');
    }

    valuePage.curPage = pageNumber;
    pagination(valuePage);
    console.log(valuePage);
    handleButtonLeft();
    handleButtonRight();
    
    // if(!search&&!data) {
    //   return;
    //   // перехід на сторінку нема новин
    // }

    if((search&&data) || data) {
      console.log(search,data);
      fetchNewsBySearchAndData(search, data, pageNumber-1);
      // прибрати активний клас з кнопки карент і додати до 1ї
    } else {
      fetchNewsBySearch(search, pageNumber - 1);
    }

    
  //   if(search&&data) {
  //   fetchNewsBySearchAndData(search, data, pageNumber-1)
  //   } else {
  //   fetchNewsBySearch(search, valuePage.curPage - 1);
  // }
}
});

// DYNAMIC PAGINATION
function pagination() {
  const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

  const range = delta + 4; // use for handle visible number of links left side

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
  console.log(element);
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
    console.log("спрацювала фкція натискання на кнопку з класом prev-page");
    // btnLastPg.disabled = false;
  } else if (element.classList.contains('next-page')) {
    console.log("спрацювала фкція натискання на кнопку з класом next-page");
    valuePage.curPage++;
    handleButtonRight();
    btnPrevPg.disabled = false;
    // btnFirstPg.disabled = false;
  }
  pagination();
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
    console.log(valuePage.curPage);
    btnNextPg.disabled = true;
    // btnLastPg.disabled = true;
  } else {
    btnNextPg.disabled = false;
    // btnLastPg.disabled = false;
  }
}

export { valuePage, pagination };
