(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();const d="/goit-js66-team-project/assets/icon-sprites-bba1b627.svg",l="read-articles",f=document.querySelector("body");f.addEventListener("click",p);const s=localStorage.getItem(l)||[];function p(e){if(e.target.classList.contains("read-more"))return s.push(m(e)),h(l,JSON.stringify(s)),s}function m(e){const t=new Object,i=new Date;return t.readDate=i.toDateString(),t.date=e.target.previousElementSibling.textContent,t.img=e.target.parentNode.parentNode.firstElementChild.children[2].getAttribute("src"),t.imgCaption=e.target.parentNode.parentNode.firstElementChild.children[2].getAttribute("alt"),t.section=e.target.parentNode.parentNode.firstElementChild.children[1].textContent,t.title=e.target.parentNode.parentNode.firstElementChild.nextElementSibling.firstElementChild.textContent,t.description=e.target.parentNode.parentNode.firstElementChild.nextElementSibling.lastElementChild.textContent,t.url=e.target.getAttribute("href"),t}console.log(s);function h(e,t){localStorage.setItem(e,`${t}`)}function v(){const e=JSON.parse(localStorage.getItem(l));console.log(e);const t=e.map(i=>{if(!i)return;const{section:o,title:r,description:n,date:a,img:c,readDate:E,url:u,imgCaption:g}=i;return`<li class="article">
     <div class="article_img_wrapper">
       <p class="already-read">Already read</p>
       <p class="article_category">${o}</p>
       <img class="article_img" src="${c[c.length-1].url}" alt="${g}" width="395" height="395">
       <div class="article_flag">
       <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${d}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${d}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${r}</h2>
       <p class="article_text">${n}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${a}</p>
       <a href="${u}" class="read-more" target="blank">Read more</a>
     </div>
     </li>`}).join("");return console.log(t),t}const b=document.querySelector(".read-output"),_=document.querySelector("#read-link");_.addEventListener("click",y);function y(e){console.log(e),C(v())}function C(e){b.insertAdjacentHTML("afterend",e)}export{d as s};
