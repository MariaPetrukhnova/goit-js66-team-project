import NewsApi from './apiConstructor.js';
import spriteUrl from '/images/icon-sprites.svg';

const newsApi = new NewsApi();
const articlesGallery = document.querySelector('.articles_container');
const categoryList = document.querySelector('.js-category__wrap');

categoryList.addEventListener('click', categorySelect)

function categorySelect (event) {
    event.preventDefault();
    if (!event.target.className.includes("js-category__btn") && !event.target.className.includes("rest__item")) {
        return;
    }
    const handledCategory = event.target.textContent;
    const categoryKey = encodeURIComponent(handledCategory.toLowerCase());
    searchByCategory(categoryKey)
};

async function searchByCategory (handledCategory) {
   try {
    const response = await fetch(`${newsApi.CATEGORY_END_POINT}${handledCategory}.json?${newsApi.API_KEY}`);
    const articles = await response.json()
    const resArr = articles.results;
    console.log(resArr)
    arrHandler(resArr);
    
   }
   catch (error) {
    console.log(error);
  }   
};

function arrHandler(arr) {
  try{
    const objArr = arr.map(el => {
      if (!el.title || !el.abstract) {
        return;
      }
      if (el.multimedia === null) {
        return {
          section: el.section_name || el.section,
          title: el.title || el.headline.main || "No titel",
          description: el.abstract || "No description",
          url: el.web_url || el.url,
          date: el.pub_date || el.created_date,
          imgCaption: el.title,
          img: `https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png`,
        };
      }
      
      return {
        section: el.section_name || el.section,
        title: el.title || el.headline.main || "No Titel",
        description: el.abstract || "No description",
        url: el.web_url || el.url,
        date: el.pub_date || el.created_date,
        imgCaption: el.multimedia[2].caption,
        img: el.multimedia[2].url,
      };
    });
    console.log(objArr)
    createBaseMarcup(objArr);
  } catch (error) {
    console.error(error);
  }
};
function createBaseMarcup(arr) {
  const marcup = arr
    .map(article => {
      if (!article) {
        return;
      }
      const { section, title, description, url, date, img, imgCaption } =
        article;

      return `<li class="article">
     <div class="article_img_wrapper">
       <p class="already-read">Already read</p>
       <p class="article_category">${section}</p>
       <img class="article_img" src="${img}" alt="${imgCaption}" width="395" height="395">
       <div class="article_flag">
       <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${spriteUrl}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${spriteUrl}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${title}</h2>
       <p class="article_text">${description}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${date}</p>
       <a href="${url}" class="read-more">Read more</a>
     </div>
     </li>`;
    })
    .join('');

  return addMarkup(marcup);
}

function addMarkup(tagString) {
  articlesGallery.innerHTML = '';
  articlesGallery.insertAdjacentHTML('beforeend', tagString);
}

export * as apiCategoties from './api-categories.js';