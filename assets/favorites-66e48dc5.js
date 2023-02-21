import{s as a}from"./icon-sprites-07d39546.js";const p="favorite-articles";document.addEventListener("DOMContentLoaded",e=>{e.preventDefault(),document.querySelector(".articles_container").innerHTML=h()});function h(){return JSON.parse(localStorage.getItem(p)).map(t=>{if(!t)return;const{section:r,title:i,description:s,url:l,date:c,img:d,imgCaption:n,id:o}=t;return`<li class="article" data-id="${o}">
     <div class="article_img_wrapper">
       <p class="already-read is-hidden">Already read</p>
       <p class="article_category">${r}</p>
       <img class="article_img" src="${d}" alt="${n}" width="395" height="395">
       <div class="article_flag">
       <button class="article_flag--add  is-hidden"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${a}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="article_flag--remove"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${a}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${i}</h2>
       <p class="article_text">${s}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${c}</p>
       <a href="${l}" class="read-more" target="_blank">Read more</a>
     </div>
     </li>`}).join("")}
