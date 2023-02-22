import{s as o}from"./icon-sprites-72f058bc.js";function w(a,e=!0){return(e?S(a):a).map(s=>{if(!s)return;const{section:m,title:p,description:_,url:h,date:f,img:v,imgCaption:b,id:y}=s;return`<li class="article" data-id="${y}">
     <div class="article_img_wrapper">
       <p class="already-read is-hidden">Already read</p>
       <p class="article_category">${m}</p>
       <img class="article_img" src="${v}" alt="${b}" width="395" height="395">
       <div class="article_flag">
       <button class="favorites-button article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${o}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="favorites-button article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${o}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${p}</h2>
       <p class="article_text">${_}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${f}</p>
       <a href="${h}" class="read-more" target="_blank">Read more</a>
     </div>
     </li>`}).join("")}function S(a){try{return a.map(t=>t.media.length===0?{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date||t.published_date,img:"https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png",imgCaption:"image",id:t.id}:{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date||t.published_date,img:t.media[0]["media-metadata"][2].url,imgCaption:t.media[0].caption,id:t.id})}catch(e){console.error(e)}}const u="read-articles",g="favorite-articles",A=document.querySelector("body");A.addEventListener("click",q);document.querySelector(".already-read");const i=JSON.parse(localStorage.getItem(u))||[],c=JSON.parse(localStorage.getItem(g))||[];function q(a){if(a.target.classList.contains("read-more")){const e=a.target.closest(".article"),t=e.dataset.id;e.querySelector(".already-read").classList.remove("is-hidden"),i.find(r=>r.id===t)||(i.push(n(a)),d(u,JSON.stringify(i)))}else if(a.target.classList.contains("favorites-button")||a.target.closest(".favorites-button")){const e=a.target.closest(".article"),t=e.dataset.id;e.querySelector(".article_flag--add").classList.toggle("is-hidden"),e.querySelector(".article_flag--remove").classList.toggle("is-hidden"),c.find(r=>r.id===t)||(c.push(n(a)),d(g,JSON.stringify(c)))}else return}var l;(l=document.querySelector(".articles_container"))==null||l.addEventListener("rendered",a=>{const e=a.target;i!=null&&i.length&&i.forEach(t=>{var r,s;(s=(r=e.querySelector(`[data-id="${t.id}"]`))==null?void 0:r.querySelector(".already-read"))==null||s.classList.remove("is-hidden")})});function n(a){const e=new Object;e.readDate=new Date().toDateString();const t=a.target.closest(".article");return e.date=t.querySelector(".article_date").textContent,e.img=t.querySelector("img").getAttribute("src"),e.imgCaption=t.querySelector("img").getAttribute("alt"),e.section=t.querySelector(".article_category").textContent,e.title=t.querySelector(".article_title").textContent,e.description=t.querySelector(".article_text").textContent,e.id=t.dataset.id,e.url=a.target.getAttribute("href"),e}function d(a,e){localStorage.setItem(a,`${e}`)}export{w as c,q as o};
