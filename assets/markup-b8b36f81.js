(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const n="/goit-js66-team-project/assets/icon-sprites-8f904247.svg";function g(a,i=!0){return(i?f(a):a).map(t=>{if(!t)return;const{section:r,title:s,description:c,url:d,date:l,img:u,imgCaption:p,id:m}=t;return`<li class="article" data-id="${m}">
     <div class="article_img_wrapper">
       <p class="already-read is-hidden">Already read</p>
       <p class="article_category">${r}</p>
       <img class="article_img" src="${u}" alt="${p}" width="395" height="395">
       <div class="article_flag">
       <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${n}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${n}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${s}</h2>
       <p class="article_text">${c}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${l}</p>
       <a href="${d}" class="read-more" target="_blank">Read more</a>
     </div>
     </li>`}).join("")}function f(a){try{const i=a.map(e=>e.media.length===0?{section:e.section_name||e.section,title:e.title||e.headline.main,description:e.abstract,url:e.web_url||e.url,date:e.pub_date||e.created_date||e.published_date,img:"https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png",imgCaption:"image",id:e.id}:{section:e.section_name||e.section,title:e.title||e.headline.main,description:e.abstract,url:e.web_url||e.url,date:e.pub_date||e.created_date||e.published_date,img:e.media[0]["media-metadata"][2].url,imgCaption:e.media[0].caption,id:e.id});return console.log(i),i}catch(i){console.error(i)}}export{g as c,n as s};
