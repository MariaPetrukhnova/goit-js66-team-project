import { fetchPopularNews } from './try_api';
import { createBaseMarkup } from './markup';
import { refsEl } from './refs';
import { setFavorites, setRead } from './localeStoreageHandler';
import { loadWeatherDate } from './weather';

document.addEventListener('DOMContentLoaded', onDOMLoad);

function onDOMLoad(e) {
  e.preventDefault();
  
  fetchPopularNews()
    .then(articles => createBaseMarkup(articles))
    .then(markup => {
      refsEl.articlesGallery.insertAdjacentHTML('beforeend', markup);
      loadWeatherDate();
      const event = new Event('rendered');
      refsEl.articlesGallery.dispatchEvent(event);
    })
    .then(() => {
      const articleDescription = [
        ...refsEl.articlesGallery.querySelectorAll('.article_text'),
      ];
      sliceArticlesDescription(articleDescription);
    });
  setFavorites();
  setRead();
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
