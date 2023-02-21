import { createBaseMarkup  } from './partials/markup';
const LOCALSTORAGE_KEY = "read-articles";

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    document.querySelector('#read-articles').innerHTML = makeMarkup();

    document.querySelector('[data-toggle]').classList.add('is-active')

    document.querySelectorAll('[data-toggle]')?.forEach((el) => {
        el.addEventListener('click', () => {
            el.classList.toggle('is-active')
        })
    })
});

function makeMarkup() {
    const objArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

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
        result += `<header class="articles-group__header" data-toggle="${articleDate}"><h3>${articleDate}</h3></header>`
        result += `<div class="articles-group__pane" data-pane="${articleDate}"><ul class="articles_container">`

        result += createBaseMarkup(articlesByDate[articleDate], false)

        result += '</ul></div></section>'
    }

    return result
}
