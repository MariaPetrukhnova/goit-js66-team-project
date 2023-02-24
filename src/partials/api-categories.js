import NewsApi from './apiConstructor.js';
import spriteUrl from '/images/icon-sprites.svg';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
// ===================================================================
const newsApi = new NewsApi();
const articlesGallery = document.querySelector('.articles_container');
const categoryList = document.querySelector('.js-category__wrap');
const deletePagination = document.querySelector('.page-container');

// ===================================================================
let handledCategory = '';

// ===================================================================

categoryList.addEventListener('click', categorySelect);

function categorySelect(event) {
  event.preventDefault();
  if (!event.target.className.includes('js-search')) {
    return;
  }
  Loading.standard('Loading...', {
    backgroundColor: 'rgba(0,0,0,0.8)',
  });
  handledCategory = event.target.textContent;
  const categoryKey = encodeURIComponent(handledCategory.toLowerCase());
  searchByCategory(categoryKey);
  Loading.remove(1000);
}
// =====================================================================
async function searchByCategory(handledCategory) {
  try {
    const response = await fetch(
      `${newsApi.CATEGORY_END_POINT}${handledCategory}.json?api-key=Mw0nOoO0CyWfJRrshsqkL1haZT52Fizf`
    );
    const articles = await response.json();
    const resArr = articles.results;
    arrHandler(resArr);
  } catch (error) {
    console.log(error);
  }
}
// ==========================================// const arrlength = el.multimedia?.length ;
function arrHandler(arr) {
  try {
    const objArr = arr.map(el => {
      let section = el.section;
      let title = el.title;
      let description = el.abstract;
      let url = el.url;
      let date = el.created_date.slice(0, 10);
      let mediaArr = el.multimedia;
      let image = '';
      let imageAlt = '';

      if (!section) {
        section = `${handledCategory}`;
      }
      if (!title) {
        title = description.slice(0, 80);
      }
      if (!description) {
        description = title;
      }
      if (mediaArr === null) {
        image =
          el.thumbnail_standard ||
          'https://cdn.pixabay.com/photo/2013/07/12/19/16/newspaper-154444_960_720.png';
        imageAlt = title;
      } else if (mediaArr[2]) {
        image = mediaArr[2].url;
        imageAlt = mediaArr[2].caption;
      } else {
        image = mediaArr[0].url;
        imageAlt = mediaArr[0].caption;
      }

      return {
        section: section,
        title: title,
        description: description,
        url: url,
        date: date,
        imgCaption: imageAlt,
        img: image,
      };
    });
    createBaseMarcup(objArr);
  } catch (error) {
    console.log(error);
  }
}
function createBaseMarcup(arr) {
  const marcup = arr
    .map(article => {
      if (!article) {
        return;
      }
      const { section, title, description, url, date, img, imgCaption } =
        article;
      return `<li class="article" >
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
        <p class="article_text">${description}</p>
      </div>
      <div class="article_info_wrapper">
        <p class="article_date">${date}</p>
        <a href="${url}" class="read-more" target="_blank">Read more</a>
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

export * as apiCategoties from './api-categories.js';
