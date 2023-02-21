const API_KEY = 'api-key=9GYTd3hNgT1cJMME7q1HMJAu02NGsmfm';

const API_HOST = 'https://api.nytimes.com';
const WEB_HOST = 'https://www.nytimes.com';
const BASE_ENDPOINT_URL = `${API_HOST}/svc/topstories/v2/arts.json?${API_KEY}`;
const SEARCH_ENDPOINT_URL = `${API_HOST}/svc/search/v2/articlesearch.json?`;

function fetchPopularNews() {
  try {
    return fetch(`${API_HOST}/svc/mostpopular/v2/viewed/1.json?${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Such a request has not been found');
        }
        return response.json();
      })
      .then(({ results }) => results);
  } catch (error) {
    console.log(error.message);
  }
}

export { fetchPopularNews };
