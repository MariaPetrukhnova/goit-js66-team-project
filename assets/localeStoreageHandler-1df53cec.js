(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();const c="/goit-js66-team-project/assets/icon-sprites-da59ca18.svg",d="read-articles",f=document.querySelector("body");f.addEventListener("click",p);const s=[];function p(t){const e=new Date;return console.log(e.toDateString()),s.push(m(t)),h(d,JSON.stringify(s)),s}function m(t){if(!t.target.classList.contains("read-more"))return;const e=new Object,a=new Date;return e.readDate=a.toDateString(),console.log(e.readDate),e.date=t.target.previousElementSibling.textContent,e.img=t.target.parentNode.parentNode.firstElementChild.children[2].getAttribute("src"),e.imgCaption=t.target.parentNode.parentNode.firstElementChild.children[2].getAttribute("alt"),e.section=t.target.parentNode.parentNode.firstElementChild.children[1].textContent,e.title=t.target.parentNode.parentNode.firstElementChild.nextElementSibling.firstElementChild.textContent,e.description=t.target.parentNode.parentNode.firstElementChild.nextElementSibling.lastElementChild.textContent,e.url=t.target.getAttribute("href"),console.log(e),e}console.log(s);function h(t,e){localStorage.setItem(t,`${e}`)}function v(){const t=JSON.parse(localStorage.getItem(d));console.log(t);const e=t.map(a=>{if(!a)return;const{section:o,title:r,description:n,date:i,img:l,readDate:E,url:u,imgCaption:g}=a;return`<li class="article">
     <div class="article_img_wrapper">
       <p class="already-read">Already read</p>
       <p class="article_category">${o}</p>
       <img class="article_img" src="${l[l.length-1].url}" alt="${g}" width="395" height="395">
       <div class="article_flag">
       <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${c}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${c}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${r}</h2>
       <p class="article_text">${n}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${i}</p>
       <a href="${u}" class="read-more" target="blank">Read more</a>
     </div>
     </li>`}).join("");return console.log(e),e}const _=document.querySelector(".read-output"),y=document.querySelector("#read-link");y.addEventListener("click",b);function b(t){console.log(t),C(v())}function C(t){_.insertAdjacentHTML("afterend",t)}export{c as s};
