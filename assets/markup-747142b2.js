import{s as r}from"./icon-sprites-d920057c.js";function g(a,i=!0){return(i?u(a):a).map(e=>{if(!e)return;const{section:s,title:d,description:c,url:n,date:o,img:l,imgCaption:p,id:m}=e;return`<li class="article" data-id="${m}">
     <div class="article_img_wrapper">
       <p class="already-read is-hidden">Already read</p>
       <p class="article_category">${s}</p>
       <img class="article_img" src="${l}" alt="${p}" width="395" height="395">
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
       <h2 class="article_title">${d}</h2>
       <p class="article_text">${c}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${o}</p>
       <a href="${n}" class="read-more" target="_blank">Read more</a>
     </div>
     </li>`}).join("")}function u(a){try{return a.map(t=>t.media.length===0?{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date||t.published_date,img:"https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png",imgCaption:"image",id:t.id}:{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date||t.published_date,img:t.media[0]["media-metadata"][2].url,imgCaption:t.media[0].caption,id:t.id})}catch(i){console.error(i)}}export{g as c};
