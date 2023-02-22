import NewsApi from './apiConstructor.js';
import spriteUrl from '/images/icon-sprites.svg';
import { fetchNewsBySearchAndData } from './calendar.js';

const articlesGallery = document.querySelector('.articles_container');
const deletePagination = document.querySelector('.page-container');

const newsApi = new NewsApi();

// const API_KEY = 'api-key=JmGuT2FnDagHatExdMuVy4QCYQRUlSyR';
// -->
const pageNotFound = document.querySelector(`.not-found`);
// const newsGallery = document.querySelector(`.news-gallery`);
// -->

const searchInput = document.querySelector('.page-header__search-input');
searchInput.addEventListener('change', onEnterPush);
// * Тут замість submit подія change

function onEnterPush(e) {
  e.preventDefault();
  const query = e.target.value;
  const dateInput = document.querySelector('.calendar__input');
  dateInput.value = '';
  console.log(query);

  if (!dateInput.value) {
    fetchNewsBySearch(query);
    console.log('Виклик fetchNewsBySearch(query) без даних по даті');
  }
  if (dateInput.value) {

    fetchNewsBySearchAndData(query);
    console.log('Виклик fetchNewsBySearch(query) з даними по даті');
  }
}

const fetchNewsBySearch = async request => {
  try {
    const response = await fetch(
      `${newsApi.SEARCH_ENDPOINT_URL}q=${request}&${newsApi.API_KEY}`
    );
    // // -->
    // console.log(`response`, response.ok);
    // // -->
    if (response.ok === false) {
      throw new Error('Such a request has not been found');
    }
    const articles = await response.json();
    const resArr = articles.response.docs;
    console.log(resArr.length, 'roketa');
    // // -->
    // console.log(`resArr`, resArr);
    // // -->

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
    articlesGallery.innerHTML = '';
    pageNotFound.classList.remove(`is-hidden`);
  }
}
// --> render section not-found

export * as apiFetchNewsByValue from './apiFetchNewsByValue.js';
export { arrHandler, notFoundHandler, fetchNewsBySearch, searchInput };
