import{s as a}from"./icon-sprites-e140b9bd.js";const u="favorite-articles";document.addEventListener("DOMContentLoaded",t=>{t.preventDefault(),document.querySelector(".articles_container").innerHTML=g()});function g(){const t=JSON.parse(localStorage.getItem(u));return!t||t.length===0?"<h2 class='articles-not-found'>You don't have favorite articles yet</h2><img class='not-found-img' src='./images/not-found-desktop-1x.png' alt='no articles there'>":t.map(e=>{if(!e)return;const{section:s,title:l,description:c,url:n,date:o,img:d,imgCaption:h,id:p}=e;return`<li class="article" data-id="${p}">
     <div class="article_img_wrapper">
       <p class="already-read is-hidden">Already read</p>
       <p class="article_category">${s}</p>
       <img class="article_img" src="${d}" alt="${h}" width="395" height="395">
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
       <h2 class="article_title">${l}</h2>
       <p class="article_text">${c}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${o}</p>
       <a href="${n}" class="read-more" target="_blank">Read more</a>
     </div>
     </li>`}).join("")}var r,i;(i=(r=document.querySelector(`.navbar__link[href="${window.location.pathname}"]`))==null?void 0:r.classList)==null||i.add("navbar__link--current");
