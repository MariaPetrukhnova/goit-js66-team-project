import { createBaseMarkup } from './partials/markup';
import spriteUrl from '/images/icon-sprites.svg';
const LOCALSTORAGE_FAV_KEY = "favorite-articles";

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    document.querySelector('.articles_container').innerHTML = makeMarkup();
});

function makeMarkup() {
    const objArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_FAV_KEY));

    if (!objArr || objArr.length === 0) {
        return "<li class='not-found-container'><h2 class='articles-not-found'>You don't have favorite articles yet</h2><img class='not-found-img' src='./images/not-found-desktop-1x.png' alt='no articles there'></li>";
    }
    const markup = objArr.map(article => {
        if (!article) {
        return;
      }

      const { section, title, description, url, date, img, imgCaption, id } =
        article;

      return `<li class="article" data-id="${id}">
     <div class="article_img_wrapper">
       <p class="already-read is-hidden">Already read</p>
       <p class="article_category">${section}</p>
       <img class="article_img" src="${img}" alt="${imgCaption}" width="395" height="395">
       <div class="article_flag">
       <button class="article_flag--add  is-hidden"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${spriteUrl}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="article_flag--remove"><span class="article_flag_text">Remove from favorite</span>
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

  return markup;
}

if (window.location.pathname === '/') {
    document.querySelector('.navbar__link')?.classList?.add('navbar__link--current')
} else {
    document.querySelector(`.navbar__link[href=".${window.location.pathname}"]`)?.classList?.add('navbar__link--current')
}
