import NewsApi from './apiConstructor.js';

const newsApi = new NewsApi();

https: document.addEventListener('DOMContentLoaded', onDOMLoad);

const fetchBaseNews = async () => {
  try {
    const response = await fetch(newsApi.BASE_ENDPOINT_URL);
    if (response.ok === false) {
      throw new Error('Such a request has not been found');
    }
    const articles = await response.json();
    const resArr = articles.results;
    arrHandler(resArr);
  } catch (error) {
    console.log(error.message);
  }
};

function onDOMLoad(e) {
  e.preventDefault();
  fetchBaseNews();
}

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

export * as apiTools from './api-handler.js';
