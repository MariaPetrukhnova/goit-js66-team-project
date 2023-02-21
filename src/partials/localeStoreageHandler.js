import spriteUrl from '/images/icon-sprites.svg';
const LOCALSTORAGE_KEY = "read-articles";

const body = document.querySelector('body');

body.addEventListener('click', onArticleLink);
const alreadyRead = document.querySelector('.already-read');

const articlesArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];

function onArticleLink(e) {
    if (!e.target.classList.contains("read-more")) return;

    const articleEl = e.target.closest('.article');
    const articleId = articleEl.dataset.id;
    articleEl.querySelector('.already-read').classList.add('is-visible');

    if (!articlesArr.find((item) => item.id === articleId)) {
        articlesArr.push(createCardObj(e));
        addArticlesToLocaleStorage(LOCALSTORAGE_KEY, JSON.stringify(articlesArr));
    }
}

document.querySelector('.articles_container').addEventListener('rendered', (e) => {
    const container = e.target;

    articlesArr.forEach((item) => {
        container.querySelector(`[data-id="${item.id}"]`).querySelector('.already-read').classList.add('is-visible')
    })
})


function createCardObj(e) {    

    const savedCard = new Object;
    const dateOfRead = new Date;
    savedCard.readDate = dateOfRead.toDateString();
    console.log(savedCard.readDate);

    savedCard.date = e.target.previousElementSibling.textContent;
    savedCard.img = e.target.parentNode.parentNode.firstElementChild.children[2].getAttribute('src');
    savedCard.imgCaption = e.target.parentNode.parentNode.firstElementChild.children[2].getAttribute('alt');
    savedCard.section = e.target.parentNode.parentNode.firstElementChild.children[1].textContent;
    savedCard.title = e.target.parentNode.parentNode.firstElementChild.nextElementSibling.firstElementChild.textContent;
    savedCard.description = e.target.parentNode.parentNode.firstElementChild.nextElementSibling.lastElementChild.textContent;
    savedCard.id = e.target.closest('.article').dataset.id;
    savedCard.url = e.target.getAttribute('href');
 
    return savedCard;
}

console.log(articlesArr);

function addArticlesToLocaleStorage(key, arr) {
    localStorage.setItem(key, `${arr}`);
}

// function makeMarkup() {
//     const objArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
//     console.log(objArr);
//     const markup = objArr.map(article => {
//       if (!article) {
//         return;
//       }
//       const { section, title, description, date, img, readDate, url, imgCaption } =
//         article;

//       return `<li class="article">
//      <div class="article_img_wrapper">
//        <p class="already-read">Already read</p>
//        <p class="article_category">${section}</p>
//        <img class="article_img" src="${
//          img[img.length - 1].url
//        }" alt="${imgCaption}" width="395" height="395">
//        <div class="article_flag">
//        <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
//          <svg width="16" height="16">
//          <use href="${spriteUrl}#heart_contur" width="16" height="16"></use>
//         </svg>
//          </button>
//          <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
//          <svg width="16" height="16">
//          <use href="${spriteUrl}#heart_fill" width="16" height="16"></use>
//        </svg>
//           </button>
//          </div>
//      </div>
//      <div class="article_text_wrapper">
//        <h2 class="article_title">${title}</h2>
//        <p class="article_text">${description}</p>
//      </div>
//      <div class="article_info_wrapper">
//        <p class="article_date">${date}</p>
//        <a href="${url}" class="read-more" target="blank">Read more</a>
//      </div>
//      </li>`;
//     })
//     .join('');

//     console.log(markup);
//   return markup;
// }
