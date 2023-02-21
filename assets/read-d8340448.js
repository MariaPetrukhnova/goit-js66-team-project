import{s as r}from"./localeStoreageHandler-13235413.js";const s="read-articles";document.addEventListener("DOMContentLoaded",e=>{e.preventDefault();const t=g();h(t)});localStorage.getItem(s);function g(){const e=JSON.parse(localStorage.getItem(s));return console.log(e),e.map(a=>{if(!a)return;const{section:i,title:l,description:c,date:o,img:n,readDate:_,url:d,imgCaption:p}=a;return`<li class="article">
     <div class="article_img_wrapper">
       <p class="already-read is-visible">Already read</p>
       <p class="article_category">${i}</p>
       <img class="article_img" src="${n}" alt="${p}" width="395" height="395">
       <div class="article_flag">
       <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${r}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${r}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${l}</h2>
       <p class="article_text">${c}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${o}</p>
       <a href="${d}" class="read-more" target="blank">Read more</a>
     </div>
     </li>`}).join("")}const u=document.querySelector(".articles_container");function h(e){u.insertAdjacentHTML("beforeend",e)}
