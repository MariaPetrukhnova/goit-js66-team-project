import { createBaseMarkup } from './partials/markup';
import { onArticleLink } from './partials/localeStoreageHandler';
const LOCALSTORAGE_KEY = "read-articles";



document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    document.querySelector('#read-articles').innerHTML = makeMarkup();

    // document.querySelector('[data-toggle]').classList.add('is-active')

    // document.querySelectorAll('[data-toggle]')?.forEach((el) => {
    //     el.addEventListener('click', () => {
    //         el.classList.toggle('is-active')
    //     })
    // })
});

function makeMarkup() {
    const objArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    if (!objArr || objArr.length === 0) {
        return "<h2 class='articles-not-found'>You haven't read any article yet</h2><img class='not-found-img' src='./images/not-found-desktop-1x.png' alt='no articles there'>";
    }

    const articles = objArr.sort((a, b) => new Date(b.readDate) - new Date(a.readDate))
    const articlesByDate = {}
    let prevDate = ''

    articles.forEach((article) => {
        const articleDate = new Date(article.readDate)
        const formatDate = `${String(articleDate.getDate()).padStart(2, '0')}/${String(articleDate.getMonth() + 1).padStart(2, '0')}/${articleDate.getFullYear()}`
        if (prevDate !== formatDate) {
            articlesByDate[formatDate] = [];
            prevDate = formatDate;
        }

        articlesByDate[formatDate].push(article)
    });

    let result = '';

    for (const articleDate in articlesByDate) {
        result += '<section class="articles-group">'
        result += `<header class="articles-group__header" data-toggle="${articleDate}"><h3 class="data-group__header">${articleDate}</h3></header>`
        result += `<div class="articles-group__pane" data-pane="${articleDate}"><ul class="articles_container">`

        result += createBaseMarkup(articlesByDate[articleDate], false)

        result += '</ul></div></section>'
    }

    return result
}

const body = document.querySelector('body');
body.addEventListener('click', onDateHeaderClick);

function onDateHeaderClick(e) {
    if (e.target.classList.contains("data-group__header")) {
        e.target.parentNode.nextElementSibling.classList.toggle('is-hidden');
        e.target.classList.toggle('is-closed');
    }
}

body.addEventListener('click', onArticleLink);

if (window.location.pathname === '/') {
    document.querySelector('.navbar__link')?.classList?.add('navbar__link--current')
} else {
    document.querySelector(`.navbar__link[href=".${window.location.pathname}"]`)?.classList?.add('navbar__link--current')
}
