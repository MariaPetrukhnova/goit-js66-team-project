import NewsApi from './apiConstructor.js';

const newsApi = new NewsApi();

// const API_KEY = 'api-key=JmGuT2FnDagHatExdMuVy4QCYQRUlSyR';

const searchInput = document.querySelector('.page-header__search-input');
searchInput.addEventListener('change', onEnterPush);

function onEnterPush(e) {
  const query = e.target.value;
  console.log(query);
  fetchNewsBySearch(query);
}
const fetchNewsBySearch = async request => {
  try {
    const response = await fetch(
      `${newsApi.SEARCH_ENDPOINT_URL}q=${request}&${newsApi.API_KEY}`
    );
    if (response.ok === false) {
      throw new Error('Such a request has not been found');
    }
    const articles = await response.json();
    const resArr = articles.response.docs;
    console.log(resArr);
    arrHandler(resArr);
  } catch (error) {
    console.log(error.message);
  }
};

function arrHandler(arr) {
  const objArr = arr.map(el => {
    return {
      section: el.section_name || el.section,
      title: el.title || el.headline.main,
      description: el.abstract,
      url: el.web_url || el.url,
      date: el.pub_date || el.created_date,
      img: `${newsApi.WEB_HOST}/${el.multimedia[1].url}`,
    };
  });
  console.log(objArr);
}

export * as apiFetchNewsByValue from './apiFetchNewsByValue.js';
