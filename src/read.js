import * as localeStorage from './partials/localeStoreageHandler';
import articleHTML from './partials/article.html?raw';
import spriteUrl from '/images/icon-sprites.svg';

const LOCALSTORAGE_KEY = "read-articles";

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const markup = makeMarkup();
    renderMarkup(markup);
});

const articles = localStorage.getItem(LOCALSTORAGE_KEY);


function makeMarkup() {
    const objArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    console.log(objArr);

    const markup = objArr.map(article => {
      if (!article) {
        return;
      }
      const { section, title, description, date, img, readDate, url, imgCaption } =
        article;

      return `<li class="article">
     <div class="article_img_wrapper">
       <p class="already-read is-visible">Already read</p>
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
       <a href="${url}" class="read-more" target="blank">Read more</a>
     </div>
     </li>`;
    })
    .join('');

  return markup;
}

const articlesOutput= document.querySelector('.articles_container');

function renderMarkup(markup) {
    articlesOutput.insertAdjacentHTML('beforeend', markup);
}

