import { fetchPopularNews } from './try_api';
import { createBaseMarcup } from './marcup';

const articlesGallery = document.querySelector('.articles_container');

document.addEventListener('DOMContentLoaded', onDOMLoad);

function onDOMLoad(e) {
  e.preventDefault();
  fetchPopularNews()
    .then(articles => createBaseMarcup(articles))
    .then(marcup => {
      articlesGallery.insertAdjacentHTML('beforeend', marcup);
    })
    .then(() => {
      const articleDescription = [
        ...articlesGallery.querySelectorAll('.article_text'),
      ];
      sliceArticlesDescription(articleDescription);
    });
}

function sliceArticlesDescription(textNodes) {
  textNodes.forEach(textEl => {
    if (textEl.textContent.length > 150) {
      const newTextNode = textEl.textContent.slice(0, 150);
      textEl.textContent = `${newTextNode}...`;
    }
  });
}


export {sliceArticlesDescription};