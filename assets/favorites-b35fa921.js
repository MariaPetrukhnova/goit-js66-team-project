import{l as v,a as h,b,s as y}from"./localeStoreageHandler-c07f282b.js";import{n as $}from"./not-found-desktop-1x-ce68edf1.js";v();const d="favorite-articles",t=JSON.parse(localStorage.getItem(d));document.querySelector("body").addEventListener("click",e=>{var a;if(e.target.classList.contains("favorites-button")||e.target.closest(".favorites-button")){const r=(a=e.target.closest(".article"))==null?void 0:a.dataset.id;if(r){const i=t.findIndex(s=>s.id===r);i!==-1&&(t.splice(i,1),localStorage.setItem(d,JSON.stringify(t)),document.querySelector(".articles_container").innerHTML=u())}}});document.addEventListener("DOMContentLoaded",e=>{e.preventDefault(),document.querySelector(".articles_container").innerHTML=u(),h(),b()});function u(){return t!=null&&t.length?t.map(a=>{if(!a)return;const{section:r,title:i,description:s,url:p,date:m,img:f,imgCaption:_,id:g}=a;return`<li class="article" data-id="${g}">
                <div class="article_img_wrapper">
                    <p class="already-read is-hidden">Already read</p>
                    <p class="article_category">${r}</p>
                    <img class="article_img" src="${f}" alt="${_}" width="395" height="395">
                    <div class="article_flag">
                        <button class="favorites-button article_flag--remove"><span class="article_flag_text">Remove from favorite</span>
                            <svg width="16" height="16"><use href="${y}#heart_fill" width="16" height="16"></use></svg>
                        </button>
                    </div>
                </div>
                <div class="article_text_wrapper">
                    <h2 class="article_title">${i}</h2>
                    <p class="article_text">${s}</p>
                </div>
                <div class="article_info_wrapper">
                    <p class="article_date">${m}</p>
                    <a href="${p}" class="read-more" target="_blank">Read more</a>
                </div>
            </li>`}).join(""):`<li class="not-found-container"><h2 class="articles-not-found">You don't have favorite articles yet</h2><img class="not-found-img" src="${$}" alt="no articles there" /></li>`}var n,l,o,c;window.location.pathname==="/"?(l=(n=document.querySelector(".navbar__link"))==null?void 0:n.classList)==null||l.add("navbar__link--current"):(c=(o=document.querySelector(`.navbar__link[href=".${window.location.pathname}"]`))==null?void 0:o.classList)==null||c.add("navbar__link--current");
