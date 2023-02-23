import NewsApi from './apiConstructor.js';
import spriteUrl from '/images/icon-sprites.svg';
import { fetchNewsBySearchAndData } from './calendar.js';
import {valuePage, pagination} from './paginations';


const pg = document.getElementById('pagination');
const articlesGallery = document.querySelector('.articles_container');
const deletePagination = document.querySelector('.page-container');

const newsApi = new NewsApi();

// const API_KEY = 'api-key=JmGuT2FnDagHatExdMuVy4QCYQRUlSyR';
// -->
let hits = 1000;
const pageNotFound = document.querySelector(`.not-found`);
// const newsGallery = document.querySelector(`.news-gallery`);
// -->
const searchInput = document.querySelector('.search-field');
searchInput.addEventListener('submit', onEnterPush);

function onEnterPush(e) {
  e.preventDefault();

  const form = e.currentTarget;
  // if(!query) {
  //   return;
  // }

  const query = form.elements.searchQuery.value.trim();

  const dateInput = document.querySelector('.calendar__input');
  dateInput.value = '';
  let pageNum = newsApi.pageNumber;

  if (!dateInput.value) {
    fetchNewsBySearch(query, pageNum);
    // pg.addEventListener('click', e => {
    //   const ele = e.target;

    //   if (ele.dataset.page) {
    //     const pageNumber = parseInt(e.target.dataset.page, 10);

    //     fetchNewsBySearch(query, pageNumber - 1);
    //   }
    // });
    // pg.addEventListener('click', handleSearch);
  } else if (dateInput.value) {
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

    // --> render section not-found

    if (resArr.length) {
      pageNotFound.classList.add(`is-hidden`);
      deletePagination.classList.remove(`is-hidden`);
      arrHandler(resArr);
      if (resArr.length < 9) {
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
        img: `https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png`,
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
    articlesGallery.innerHTML = '';
    pageNotFound.classList.remove(`is-hidden`);
  }
}
// --> render section not-found

export * as apiFetchNewsByValue from './apiFetchNewsByValue.js';
export { arrHandler, notFoundHandler, fetchNewsBySearch, searchInput, hits };
