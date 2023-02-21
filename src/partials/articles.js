import { fetchPopularNews } from './try_api';
import { createBaseMarkup } from './markup';

const articlesGallery = document.querySelector('.articles_container');

document.addEventListener('DOMContentLoaded', onDOMLoad);

function onDOMLoad(e) {
  e.preventDefault();
  fetchPopularNews()
    .then(articles => createBaseMarkup(articles))
    .then(markup => {
      articlesGallery.insertAdjacentHTML('beforeend', markup);
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