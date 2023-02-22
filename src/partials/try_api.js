import NewsApi from './apiConstructor';

const newsApi = new NewsApi();

function fetchPopularNews() {
  try {
    return fetch(`${newsApi.MOST_POPULAR_URL}`)
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
