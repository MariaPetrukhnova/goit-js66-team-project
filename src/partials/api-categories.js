import NewsApi from './apiConstructor.js'
import { makeMarkup, addMarkup } from './renderMarkup';
const newsApi = new NewsApi();

const categoryList = document.querySelector('.category__list');

categoryList.addEventListener('click', categorySelect)

function categorySelect (event) {
    event.preventDefault();
    if (event.target.className !== 'category__btn') {
        return;
    }
    const handledCategory = event.target.textContent;
    const categoryKey = encodeURIComponent(handledCategory.toLowerCase());
    searchByCategory(categoryKey)
};

async function searchByCategory (handledCategory) {
   try {
    const response = await fetch(`${newsApi.CATEGOTY_END_POINT}${handledCategory}.json?${newsApi.API_KEY}`);
    const articles = await response.json()
    const resArr = articles.results;
    arrHandler(resArr);
    
   }
   catch (error) {
    console.log(error);
  }   
};

function arrHandler(arr) {
  const objArr = arr.map(el => {
    if (el.multimedia === null) {
      return {
        section: el.section_name || el.section,
        title: el.title || el.headline.main,
        description: el.abstract,
        url: el.web_url || el.url,
        date: el.pub_date || el.created_date,
        imgCaption: el.title,
        img: `https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png`,
      };
    }
    return {
      section: el.section_name || el.section,
      title: el.title || el.headline.main,
      description: el.abstract,
      url: el.web_url || el.url,
      date: el.pub_date || el.created_date,
      imgCaption: el.multimedia[2].caption,
      img: el.multimedia[2].url,
    };
  });
  const finalMarkup = makeMarkup(objArr);
  addMarkup(finalMarkup);
}
export * as apiCategoties from './api-categories.js';