import spriteUrl from '/images/icon-sprites.svg';
import { setRead } from './partials/localeStoreageHandler';
const LOCALSTORAGE_FAV_KEY = "favorite-articles";

const favoritesArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_FAV_KEY));

document.querySelector('body').addEventListener('click', (e) => {
    if (e.target.classList.contains("favorites-button") || e.target.closest('.favorites-button')) {
        const postId = e.target.closest('.article')?.dataset.id;

        if (postId) {
            const postIndex = favoritesArr.findIndex((item) => item.id === postId)

            if (postIndex !== -1) {
                favoritesArr.splice(postIndex, 1);

                localStorage.setItem(LOCALSTORAGE_FAV_KEY, JSON.stringify(favoritesArr));

                document.querySelector('.articles_container').innerHTML = makeMarkup();
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    document.querySelector('.articles_container').innerHTML = makeMarkup();
    setRead();
});

function makeMarkup() {
    if (!favoritesArr?.length) {
        return "<li class='not-found-container'><h2 class='articles-not-found'>You don't have favorite articles yet</h2><img class='not-found-img' src='./images/not-found-desktop-1x.png' alt='no articles there'></li>";
    }

    const markup = favoritesArr.map(article => {
        if (!article) {
            return;
        }

        const { section, title, description, url, date, img, imgCaption, id } = article;

        return `<li class="article" data-id="${id}">
                <div class="article_img_wrapper">
                    <p class="already-read is-hidden">Already read</p>
                    <p class="article_category">${section}</p>
                    <img class="article_img" src="${img}" alt="${imgCaption}" width="395" height="395">
                    <div class="article_flag">
                        <button class="favorites-button article_flag--remove"><span class="article_flag_text">Remove from favorite</span>
                            <svg width="16" height="16"><use href="${spriteUrl}#heart_fill" width="16" height="16"></use></svg>
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
    }).join('');

    return markup;
}

if (window.location.pathname === '/') {
    document.querySelector('.navbar__link')?.classList?.add('navbar__link--current')
} else {
    document.querySelector(`.navbar__link[href=".${window.location.pathname}"]`)?.classList?.add('navbar__link--current')
}

