import NewsApi from './apiConstructor.js';
import { makeMarkup, addMarkup } from './renderMarkup';
const API_KEY = 'api-key=Mw0nOoO0CyWfJRrshsqkL1haZT52Fizf';
// const API_KEY = "api-key=9GYTd3hNgT1cJMME7q1HMJAu02NGsmfm";
// const API_KEY = 'api-key=JmGuT2FnDagHatExdMuVy4QCYQRUlSyR';



const newsApi = new NewsApi()
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
    const response = await fetch(`${newsApi.CATEGOTY_END_POINT}${handledCategory}.json?${API_KEY}`);
    const articles = await response.json();
    const resArr = articles.results;
    // const answer = arrHandler(resArr);
    console.log(resArr)
   }
   catch (error) {
    console.log(error);
  }   
};

function arrHandler (arr){
  const respObj = arr.map(item => {
    return {
      title: item.title || item.abstract,
      description: item.abstract,
      url: item.url,
      date: item.published_date || item.created_date,
      img: `${item.multimedia[0].url}`,
      imgCaption: `${item.multimedia[0].caption}`
    };

  });
  return respObj
//  const markup = createCards(respObj);
//  console.log(markup);
}


// function createCards (respObj) {
//   const markup = respObj.reduce((string, item) => createCard(item)+string,"")
//   return markup
// }

// function createCard({title, description, url, date, img}) {
//   return `
//   <div class="card">
//         <img src=${img} alt="${imgCaption}">
//         <h3>${title}</h3>
//         <p>${description}</p>
//         <a href="${url}"></a>
//     </div>`
// }
export * as apiCategoties from './api-categories.js';