import{s as a}from"./icon-sprites-b0ceb375.js";const g="favorite-articles";document.addEventListener("DOMContentLoaded",e=>{e.preventDefault(),document.querySelector(".news-gallery").innerHTML=m()});function m(){const e=JSON.parse(localStorage.getItem(g));return!e||e.length===0?"<h2 class='articles-not-found'>You don't have favorite articles yet</h2><img class='not-found-img' src='./images/not-found-desktop-1x.png' alt='no articles there'>":e.map(t=>{if(!t)return;const{section:n,title:c,description:o,url:d,date:h,img:p,imgCaption:u,id:_}=t;return`<li class="article" data-id="${_}">
     <div class="article_img_wrapper">
       <p class="already-read is-hidden">Already read</p>
       <p class="article_category">${n}</p>
       <img class="article_img" src="${p}" alt="${u}" width="395" height="395">
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
       <h2 class="article_title">${c}</h2>
       <p class="article_text">${o}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${h}</p>
       <a href="${d}" class="read-more" target="_blank">Read more</a>
     </div>
     </li>`}).join("")}var r,i,s,l;window.location.pathname==="/"?(i=(r=document.querySelector(".navbar__link"))==null?void 0:r.classList)==null||i.add("navbar__link--current"):(l=(s=document.querySelector(`.navbar__link[href=".${window.location.pathname}"]`))==null?void 0:s.classList)==null||l.add("navbar__link--current");
