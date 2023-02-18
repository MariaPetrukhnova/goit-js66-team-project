import { fetchPopularNews } from './try_api';
import { arrHandler, createBaseMarcup } from './marcup';

const articlesGallery = document.querySelector('.articles_container');

document.addEventListener('DOMContentLoaded', onDOMLoad);

function onDOMLoad(e) {
  e.preventDefault();
  fetchPopularNews()
    .then(articles => createBaseMarcup(articles))
    .then(marcup => {
      articlesGallery.insertAdjacentHTML('beforeend', marcup);
    });
}
