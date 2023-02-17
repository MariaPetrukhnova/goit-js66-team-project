import { makeMarkup, addMarkup } from './renderMarkup';

const API_KEY = 'api-key=9GYTd3hNgT1cJMME7q1HMJAu02NGsmfm';
// const API_KEY = 'api-key=JmGuT2FnDagHatExdMuVy4QCYQRUlSyR';

const API_HOST = 'https://api.nytimes.com';
const WEB_HOST = 'https://www.nytimes.com';
const BASE_ENDPOINT_URL = `${API_HOST}/svc/topstories/v2/arts.json?${API_KEY}`;
const SEARCH_ENDPOINT_URL = `${API_HOST}/svc/search/v2/articlesearch.json?`;

document.addEventListener('DOMContentLoaded', onDOMLoad);

const fetchBaseNews = async () => {
  try {
    const response = await fetch(BASE_ENDPOINT_URL);
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

const searchInput = document.querySelector('.page-header__search-input');
searchInput.addEventListener('change', onEnterPush);

function onEnterPush(e) {
  const query = e.target.value;
  console.log(query);
  fetchNewsBySearch(query);
}

function onDOMLoad(e) {
  e.preventDefault();
  fetchBaseNews();
}

const fetchNewsBySearch = async request => {
  try {
    const response = await fetch(
      `${SEARCH_ENDPOINT_URL}q=${request}&${API_KEY}`
    );
    if (response.ok === false) {
      throw new Error('Such a request has not been found');
    }
    const articles = await response.json();
    const resArr = articles.response.docs;
    arrHandler(resArr);
  } catch (error) {
    console.log(error.message);
  }
};

function arrHandler(arr) {
  console.log(arr);
  const objArr = arr.map(el => {
    return {
      section: el.section_name || el.section,
      title: el.title || el.headline.main,
      description: el.abstract,
      url: el.web_url || el.url,
      date: el.pub_date || el.created_date,
      img: `${el.multimedia[0].url}`,
      imgCaption: `${el.multimedia[0].caption}`,
    };
  });
  console.log(objArr);
  const finalMarkup = makeMarkup(objArr);
  addMarkup(finalMarkup);
}

export { fetchNewsBySearch, fetchBaseNews };
