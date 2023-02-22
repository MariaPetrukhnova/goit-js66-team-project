import{a as v,s as h}from"./localeStoreageHandler-921e3643.js";const d="favorite-articles",t=JSON.parse(localStorage.getItem(d));document.querySelector("body").addEventListener("click",e=>{var a;if(e.target.classList.contains("favorites-button")||e.target.closest(".favorites-button")){const i=(a=e.target.closest(".article"))==null?void 0:a.dataset.id;if(i){const r=t.findIndex(s=>s.id===i);r!==-1&&(t.splice(r,1),localStorage.setItem(d,JSON.stringify(t)),document.querySelector(".articles_container").innerHTML=u())}}});document.addEventListener("DOMContentLoaded",e=>{e.preventDefault(),document.querySelector(".articles_container").innerHTML=u(),v()});function u(){return t!=null&&t.length?t.map(a=>{if(!a)return;const{section:i,title:r,description:s,url:p,date:f,img:m,imgCaption:_,id:g}=a;return`<li class="article" data-id="${g}">
                <div class="article_img_wrapper">
                    <p class="already-read is-hidden">Already read</p>
                    <p class="article_category">${i}</p>
                    <img class="article_img" src="${m}" alt="${_}" width="395" height="395">
                    <div class="article_flag">
                        <button class="favorites-button article_flag--remove"><span class="article_flag_text">Remove from favorite</span>
                            <svg width="16" height="16"><use href="${h}#heart_fill" width="16" height="16"></use></svg>
                        </button>
                    </div>
                </div>
                <div class="article_text_wrapper">
                    <h2 class="article_title">${r}</h2>
                    <p class="article_text">${s}</p>
                </div>
                <div class="article_info_wrapper">
                    <p class="article_date">${f}</p>
                    <a href="${p}" class="read-more" target="_blank">Read more</a>
                </div>
            </li>`}).join(""):"<li class='not-found-container'><h2 class='articles-not-found'>You don't have favorite articles yet</h2><img class='not-found-img' src='./images/not-found-desktop-1x.png' alt='no articles there'></li>"}var n,l,c,o;window.location.pathname==="/"?(l=(n=document.querySelector(".navbar__link"))==null?void 0:n.classList)==null||l.add("navbar__link--current"):(o=(c=document.querySelector(`.navbar__link[href=".${window.location.pathname}"]`))==null?void 0:c.classList)==null||o.add("navbar__link--current");
