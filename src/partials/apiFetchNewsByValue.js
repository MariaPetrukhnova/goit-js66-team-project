import NewsApi from './apiConstructor.js';
import spriteUrl from '/images/icon-sprites.svg';
import { fetchNewsBySearchAndData } from './calendar.js';
import { pagination, valuePage } from './paginations.js';
import { Loading } from 'notiflix/build/notiflix-loading-aio';


const pg = document.getElementById('pagination');
const articlesGallery = document.querySelector('.articles_container');
const deletePagination = document.querySelector('.page-container');
const deleteLeEl = document.querySelector('.articles_container');

const newsApi = new NewsApi();

let hits = 1000;

// const API_KEY = 'api-key=JmGuT2FnDagHatExdMuVy4QCYQRUlSyR';
// -->
let hits = 1000;
const pageNotFound = document.querySelector(`.not-found`);
// const newsGallery = document.querySelector(`.news-gallery`);
// -->
const searchInput = document.querySelector('.search-field');
searchInput.addEventListener('submit', onEnterPush);

function onEnterPush(e) {
  const form = e.currentTarget;
  const query = form.elements.searchQuery.value.trim();

  if (!query) {
    return;
  }

  e.preventDefault();

  const dateInput = document.querySelector('.calendar__input');
  dateInput.value = '';
  let pageNum = newsApi.pageNumber;

  if (!dateInput.value) {
    Loading.standard('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
    fetchNewsBySearch(query, pageNum);
    Loading.remove(1000);
  }
  if (dateInput.value) {
    fetchNewsBySearchAndData(query, dateInput, pageNum);
  }
}

const fetchNewsBySearch = async (request, pageNumber) => {
  try {
    const response = await fetch(
      `${newsApi.SEARCH_ENDPOINT_URL}q=${request}&page=${pageNumber}&${newsApi.API_KEY}`
    );
    // // -->
    // // -->
    if (response.ok === false) {
      throw new Error('Such a request has not been found');
    }
    const articles = await response.json();
    const resArr = articles.response.docs;
    hits = articles.response.meta.hits;
    if (hits > 1000) {
      valuePage.totalPages = 99;
    } else valuePage.totalPages = hits / 10;
    pagination({ curPage: 1, numLinksTwoSide: 1, totalPages: 4 });

    hits = articles.response.meta.hits;
    if (hits > 1000) {
      valuePage.totalPages = 99;
    } else valuePage.totalPages = Math.ceil(hits / 10);
    pagination({ curPage: 1, numLinksTwoSide: 1, totalPages: 4 });
    // --> render section not-found

    if (resArr.length) {
      pageNotFound.classList.add(`is-hidden`);
      deletePagination.classList.remove(`is-hidden`);
      arrHandler(resArr);
      if (hits < 9) {
        deletePagination.classList.add(`is-hidden`);
      }
    } else if (resArr.length === 0) {
      notFoundHandler();
      deletePagination.classList.add(`is-hidden`);
    }
    // --> render section not-found

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
        date: el.pub_date.slice(0, 10) || el.created_date.slice(0, 10),
        imgCaption: el.lead_paragraph,
        img: `https://cdn.pixabay.com/photo/2013/07/12/19/16/newspaper-154444_960_720.png`,
      };
    }
    return {
      section: el.section_name || el.section,
      title: el.title || el.headline.main,
      description: el.abstract,
      url: el.web_url || el.url,
      date: el.pub_date.slice(0, 10) || el.created_date.slice(0, 10),
      imgCaption: el.lead_paragraph,
      img: `${newsApi.WEB_HOST}/${el.multimedia[1].url}`,
    };
  });

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
       <p class="already-read is-hidden">Already read</p>
       <p class="article_category">${section}</p>
       <img class="article_img" src="${img}" alt="${imgCaption}" width="395" height="395">
       <div class="article_flag">
       <button class="favorites-button article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${spriteUrl}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="favorites-button article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${spriteUrl}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${title}</h2>
       <p class="article_text">${description.slice(0, 70)}...</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${date.slice(0, 10)}</p>
       <a href="${url}" class="read-more">Read more</a>
     </div>
     </li>`;
    })
    .join('');

  return addMarkup(marcup);
}

function addMarkup(tagString) {
  articlesGallery.innerHTML = '';
  deleteLeEl.classList.add('articles_container');
  articlesGallery.insertAdjacentHTML('beforeend', tagString);
}

// --> render section not-found
function notFoundHandler() {
  if (pageNotFound.classList.contains(`is-hidden`)) {
    articlesGallery.innerHTML = '';
    deleteLeEl.classList.remove('articles_container');
    pageNotFound.classList.remove(`is-hidden`);
  }
}
// --> render section not-found

export * as apiFetchNewsByValue from './apiFetchNewsByValue.js';
export { arrHandler, notFoundHandler, fetchNewsBySearch, hits };

