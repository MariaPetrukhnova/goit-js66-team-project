import { fetchPopularNews } from './try_api';
import { createBaseMarkup } from './markup';
import { refsEl } from './refs';

document.addEventListener('DOMContentLoaded', onDOMLoad);

function onDOMLoad(e) {
  e.preventDefault();
  fetchPopularNews()
    .then(articles => createBaseMarkup(articles))
    .then(markup => {
      refsEl.articlesGallery.insertAdjacentHTML('beforeend', markup);
      const event = new Event('rendered');
      refsEl.articlesGallery.dispatchEvent(event);
    })
    .then(() => {
      const articleDescription = [
        ...refsEl.articlesGallery.querySelectorAll('.article_text'),
      ];
      sliceArticlesDescription(articleDescription);
    });
}

function sliceArticlesDescription(textNodes) {
  textNodes.forEach(textEl => {
    if (textEl.textContent.length > 70) {
      const newTextNode = textEl.textContent.slice(0, 70);
      textEl.textContent = `${newTextNode}...`;
    }
  });
}
export { sliceArticlesDescription };
