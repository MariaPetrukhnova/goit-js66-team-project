import spriteUrl from '/images/icon-sprites.svg';
const LOCALSTORAGE_KEY = "read-articles";
const LOCALSTORAGE_FAV_KEY = "favorite-articles";

const body = document.querySelector('body');

body.addEventListener('click', onArticleLink);
const alreadyRead = document.querySelector('.already-read');

const articlesArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];
const favArticlesArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_FAV_KEY)) || [];

console.log('START', articlesArr);

function onArticleLink(e) {
    if (e.target.classList.contains("read-more")) {
        const articleEl = e.target.closest('.article');
        const articleId = articleEl.dataset.id;
        articleEl.querySelector('.already-read').classList.remove('is-hidden');

        if (!articlesArr.find((item) => item.id === articleId)) {
            articlesArr.push(createCardObj(e));
            addArticlesToLocaleStorage(LOCALSTORAGE_KEY, JSON.stringify(articlesArr));
        }
    } else if (e.target.classList.contains("article_flag_text")) {
        const articleEl = e.target.closest('.article');
        const articleId = articleEl.dataset.id;
        articleEl.querySelector('.article_flag--add').classList.toggle('is-hidden');
        articleEl.querySelector('.article_flag--remove').classList.toggle('is-hidden');

        if (!favArticlesArr.find((item) => item.id === articleId)) {
            favArticlesArr.push(createCardObj(e));
            addArticlesToLocaleStorage(LOCALSTORAGE_FAV_KEY, JSON.stringify(favArticlesArr));
        }
    } else return;
}

document.querySelector('.articles_container')?.addEventListener('rendered', (e) => {
    const container = e.target;

    if (articlesArr?.length) {
        console.log('Articles ', articlesArr)
        articlesArr.forEach((item) => {
            container.querySelector(`[data-id="${item.id}"]`)?.querySelector('.already-read')?.classList.add('is-visible')
        })
    }
})

function createCardObj(e) {    
    const savedCard = new Object;
    savedCard.readDate = new Date().toDateString();
    const card = e.target.closest('.article');

    savedCard.date = card.querySelector('.article_date').textContent;
    savedCard.img = card.querySelector('img').getAttribute('src');
    savedCard.imgCaption = card.querySelector('img').getAttribute('alt');
    savedCard.section = card.querySelector('.article_category').textContent;
    savedCard.title = card.querySelector('.article_title').textContent;
    savedCard.description = card.querySelector('.article_text').textContent;
    savedCard.id = card.dataset.id;
    savedCard.url = e.target.getAttribute('href');
 
    return savedCard;
}

function addArticlesToLocaleStorage(key, arr) {
    localStorage.setItem(key, `${arr}`);
}

