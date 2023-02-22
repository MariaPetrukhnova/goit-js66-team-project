import NewsApi from './apiConstructor.js';
import { valuePage } from './paginations.js';
import spriteUrl from '/images/icon-sprites.svg';
import { fetchNewsBySearchAndData } from './calendar.js';

const calendarBody = document.querySelector('.js-calendar-container');
const articlesGallery = document.querySelector('.articles_container');

const newsApi = new NewsApi();

let sumPage;

// const API_KEY = 'api-key=JmGuT2FnDagHatExdMuVy4QCYQRUlSyR';
// -->
const pageNotFound = document.querySelector(`.not-found`);
// const newsGallery = document.querySelector(`.news-gallery`);
// -->
const searchInput = document.querySelector('.search-field');
searchInput.addEventListener('submit', onEnterPush);

function onEnterPush(e) {
  const query = e.target.value;
  console.log(query);
  fetchNewsBySearch(query, valuePage.curPage - 1);
}

const fetchNewsBySearch = async (request, page) => {
  e.preventDefault();
  const form = e.currentTarget;
  console.dir(form);
  const query = form.elements.searchQuery.value.trim();
  console.log(query, 'llolo');
  const dateInput = document.querySelector('.calendar__input');
  dateInput.value = '';

  if (!dateInput.value) {
    fetchNewsBySearch(query);
    console.log('Виклик fetchNewsBySearch(query) без даних по даті');
  }
  if (dateInput.value) {
    fetchNewsBySearchAndData(query);
    console.log('Виклик fetchNewsBySearch(query) з даними по даті');
  }
}
  try {
    const response = await fetch(
      `${newsApi.SEARCH_ENDPOINT_URL}q=${request}&page=${page}&${newsApi.API_KEY}`
    );
    // // -->
    // console.log(`response`, response.ok);
    // // -->
    if (response.ok === false) {
      throw new Error('Such a request has not been found');
    }
    const articles = await response.json();
    const resArr = articles.response.docs;

    // if (skfgjs;dflkjg.meta.hits > 1000) {
    //   sumPage = 1000;
    // } else {
    //   sumPage = response.meta.hits;
    // }
    // valuePage.totalPages = sumPage / 10;

    // // -->
    // console.log(`resArr`, resArr);
    // // -->

    // --> render section not-found

    if (resArr.length) {
      pageNotFound.classList.add(`is-hidden`);
      arrHandler(resArr);
    } else if (resArr.length === 0) {
      notFoundHandler();
    }
    // --> render section not-found

    console.log(resArr);
    // arrHandler(resArr);
  } catch (error) {
    console.log(error);
  }
};

function arrHandler(arr) {
  const objArr = arr.map(el => {
    if (el.multimedia.length === 0) {
      return {
        section: el.section_name || el.section,
        title: el.title || el.headline.main,
        description: el.abstract,
        url: el.web_url || el.url,
        date: el.pub_date || el.created_date,
        imgCaption: el.lead_paragraph,
        img: `https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png`,
      };
    }
    return {
      section: el.section_name || el.section,
      title: el.title || el.headline.main,
      description: el.abstract,
      url: el.web_url || el.url,
      date: el.pub_date || el.created_date,
      imgCaption: el.lead_paragraph,
      img: `${newsApi.WEB_HOST}/${el.multimedia[1].url}`,
    };
  });

  console.log(objArr);
  createBaseMarcup(objArr);
}

function createBaseMarcup(arr) {
  const marcup = arr
    .map(article => {
      if (!article) {
        return;
      }
      const { section, title, description, url, date, img, imgCaption } =
        article;

      return `<li class="article">
     <div class="article_img_wrapper">
       <p class="already-read">Already read</p>
       <p class="article_category">${section}</p>
       <img class="article_img" src="${img}" alt="${imgCaption}" width="395" height="395">
       <div class="article_flag">
       <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${spriteUrl}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${spriteUrl}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${title}</h2>
       <p class="article_text">${description}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${date}</p>
       <a href="${url}" class="read-more">Read more</a>
     </div>
     </li>`;
    })
    .join('');

  return addMarkup(marcup);
}

function addMarkup(tagString) {
  articlesGallery.innerHTML = '';
  articlesGallery.insertAdjacentHTML('beforeend', tagString);
}

// --> render section not-found
function notFoundHandler() {
  if (pageNotFound.classList.contains(`is-hidden`)) {
    // newsGallery.innerHTML = ``;
    pageNotFound.classList.remove(`is-hidden`);
  }
}
// --> render section not-found

export * as apiFetchNewsByValue from './apiFetchNewsByValue.js';
export { fetchNewsBySearch, searchInput, valuePage };
export { arrHandler, notFoundHandler, fetchNewsBySearch };

