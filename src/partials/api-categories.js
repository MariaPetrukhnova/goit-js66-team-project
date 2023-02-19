import NewsApi from './apiConstructor'
// const API_KEY = 'api-key=Mw0nOoO0CyWfJRrshsqkL1haZT52Fizf';
// const API_KEY = "api-key=9GYTd3hNgT1cJMME7q1HMJAu02NGsmfm";
// const API_KEY = 'api-key=JmGuT2FnDagHatExdMuVy4QCYQRUlSyR';

// const API_HOST = 'https://api.nytimes.com';
// const WEB_HOST = 'https://www.nytimes.com';
// const CATEGOTY_END_POINT = `${API_HOST}/svc/news/v3/content/all/`


const categoryList = document.querySelector('.category');

categoryList.addEventListener('click', categorySelect)

function categorySelect (event) {
    event.preventDefault();
    if (event.target.className !== 'category__btn') {
        return;
    }
    const handledCategory = event.target.textContent;
    const categoryKey = encodeURIComponent(handledCategory.toLowerCase());
    searchByCategory(categoryKey)
}

async function searchByCategory (handledCategory) {
   try {
    const response = await fetch(`${NewsApi.ACATEGOTY_END_POINT}${handledCategory}.json?${NewsApi.API_KEY}`);
    // console.log(response)
    const articles = await response.json();
    // console.log(articles)
    const resArr = articles.results;
    console.log(resArr);
   }
   catch (error) {
    console.log(error.message);
  }   
};
// function arrHandler(arr) {
//     const objArr = arr.map(el => {
//         return {
//             section: el.section_name || el.section,
//             title: el.title || el.headline.main,
//             description: el.abstract, 
//             url: el.web_url || el.url,
//             date: el.pub_date || el.created_date,
//             img: `${WEB_HOST}/${el.multimedia[1].url}`
//         }
//     });
//     console.log(objArr);
// }



export * as apiCategoties from './api-categories.js';