export default class NewsApi {
  constructor() {
    this.API_KEY = 'api-key=9GYTd3hNgT1cJMME7q1HMJAu02NGsmfm';
    this.API_HOST = 'https://api.nytimes.com';
    this.WEB_HOST = 'https://www.nytimes.com';
    this.BASE_ENDPOINT_URL = `${this.API_HOST}/svc/topstories/v2/arts.json?${this.API_KEY}`;
    this.SEARCH_ENDPOINT_URL = `${this.API_HOST}/svc/search/v2/articlesearch.json?`;
    this.SEARCH_CATEGORI = `${this.API_HOST}/svc/news/v3/content/section-list.json?${this.API_KEY}`;
    this.CATEGOTY_END_POINT = `${this.API_HOST}/svc/news/v3/content/all/`;

  }
}
