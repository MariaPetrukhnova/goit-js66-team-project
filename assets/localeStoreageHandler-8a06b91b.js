(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const p={categoryBtnEl:document.querySelector(".category__btn"),listConteinerEl:document.querySelector(".js-list-container"),btnOpenModal:document.querySelectorAll(".js-open-list"),viewportWidth:window.innerWidth,sectionRestList:document.querySelector(".rest__list"),categoryWrap:document.querySelector(".js-category__wrap"),categoryBtns:document.querySelectorAll(".js-category__btn")},Y={search:document.querySelector(".js-search"),burgerMenu:document.querySelector(".js-menu-open"),searchInput:document.querySelector(".js-search-input"),body:document.querySelector("body")};Y.search.addEventListener("click",Z);function Z(e){e.preventDefault(),Y.searchInput.innerHTML='<input type="search" placeholder="Search" class="page-header__search-input">'}function ee(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var te="previous",ne="current",ae="next",j=function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0";return e<10?n+e:e},k=function(e){return"".concat(e.getFullYear(),"-").concat(j(e.getMonth()+1),"-").concat(j(e.getDate()))},F=function(e){return new Date(e.getFullYear(),e.getMonth()+1,0).getDate()},q=function(e){return new Promise(function(n){var t=[],a=ie(e).map(function(o){return{date:o.date,iso:o.iso,type:te}}),r=re(e).map(function(o){return{date:o.date,iso:o.iso,type:ne}});t=t.concat(a).concat(r);var i=oe(e,t.length).map(function(o){return{date:o.date,iso:o.iso,type:ae}});n(t.concat(i))})},C=function(e){return function(n){return Array(e).fill().map(n)}},re=function(e){var n=F(e);return C(n)(function(t,a){var r=a+1;return e.setDate(r),{date:r,iso:k(e)}})},ie=function(e){var n,t,a=e.getMonth(),r=e.getFullYear(),i=Math.min(a-1,11),o=new Date(r,i),s=F(o),c=s-(n=e,t=new Date(n.getFullYear(),n.getMonth(),1).toDateString().substring(0,3),["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(t))+1;return C(s-c+1)(function(l,u){var d=c+u;return o.setDate(d),{date:d,iso:k(o)}})},oe=function(e,n){var t=42-n,a=e.getMonth()+1===12?0:e.getMonth()+1,r=a===0?e.getFullYear()+1:e.getFullYear(),i=new Date(r,a);return C(t)(function(o,s){var c=s+1;return i.setDate(c),{date:c,iso:k(i)}})},se=function(){function e(){(function(a,r){if(!(a instanceof r))throw new TypeError("Cannot call a class as a function")})(this,e)}var n,t;return n=e,(t=[{key:"getDates",value:function(a){return new Promise(function(r){return r(q(a).then(function(i){return i.map(function(o){return o})}))})}},{key:"getMatrix",value:function(a){return new Promise(function(r){r(q(a).then(function(i){return i.reduce(function(o,s,c){return(c%7==0?o.push([s]):o[o.length-1].push(s))&&o},[])}))})}}])&&ee(n.prototype,t),Object.defineProperty(n,"prototype",{writable:!1}),e}(),ce=se;const v=new ce,$=document.querySelector(".js-open-calendar"),M=document.querySelector(".calendar__input"),G=document.querySelector(".js-calendar-container"),le=document.querySelector(".calendar__month-btn--next"),de=document.querySelector(".calendar__month-btn--prev"),ue=document.querySelector(".calendar__year-btn"),f=["January","February","March","April","May","June","July","August","September","October","November","December"];ue.addEventListener("click",_e);le.addEventListener("click",ge);de.addEventListener("click",fe);$.addEventListener("click",K);function K(){const e=M.getAttribute("aria-expanded")==="true"||!1;$.setAttribute("aria-expanded",!e),$.classList.toggle("reversed"),G.classList.toggle("is-open")}const pe=async()=>{const e=await v.getMatrix(new Date);console.log("🚀 ~ file: calendar.js:17 ~ main ~ datesArr",e);const n=new Date,t=[f[n.getMonth()],n.getFullYear()],a=S(e);b(a),w(t)};async function ge(){const n=document.querySelector(".calendar__month").textContent.split(" ");let t=me(n);const a=await v.getMatrix(new Date(`${n[1]}, ${f[t]}`)),r=S(a);console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr",r),b(r),w([f[t],n[1]])}async function fe(){const n=document.querySelector(".calendar__month").textContent.split(" ");let t=he(n);const a=await v.getMatrix(new Date(`${n[1]}, ${f[t]}`)),r=S(a);console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr",r),b(r),w([f[t],n[1]])}function he(e){let n=f.indexOf(e[0]);return console.log("date:",e),console.log("index:",n),n===0?(n=11,e[1]=+e[1]-1,console.log("date:",e)):n-=1,n}function me(e){let n=f.indexOf(e[0]);return console.log("date:",e),n===11?(n=0,e[1]=+e[1]+1,console.log("date:",e)):n+=1,n}async function _e(){const n=document.querySelector(".calendar__month").textContent.split(" ");n[1]=+n[1]+1;let t=f.indexOf(n[0]);const a=await v.getMatrix(new Date(`${n[1]}, ${f[t]}`)),r=S(a);console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr",r),b(r),w([f[t],n[1]])}function w([e,n]){const t=document.querySelector(".calendar__body-caption"),a=t.querySelector("p");a&&a.remove(),t.insertAdjacentHTML("afterbegin",`<p class="calendar__month">${e} ${n}</p>`)}function b(e){const n=document.querySelector(".calendar__list"),t=new Date().getDate(),a=new Date;n.innerHTML=`${e.map(r=>{const i=new Date(r.iso).getDay();return t===r.date?`<li id="${r.iso}" class="calendar__date calendar__date--active">${r.date}</li>`:+a<new Date(r.iso)?`<li id="${r.iso}" class="calendar__date calendar__date--inactive">${r.date}</li>`:i===6||i===0?`<li id="${r.iso}" class="calendar__date calendar__date--weekend">${r.date}</li>`:`<li id="${r.iso}" class="calendar__date">${r.date}</li>`}).join("")}`}function ye(){const e=document.querySelector(".news-gallery");return e.innerHTML=`<div class="container">
  <h2 class="not__found__title">We couldn't find news from this date</h2>
  <picture>
      <source
      srcset="./images/not-found-desktop-1x.png 1x, ./images/not-found-desktop-2x.png 2x"
      media="(min-width: 1280px)"
      />
      <source
      srcset="./images/not-found-tablet-1x.png 1x, ./images/not-found-tablet-2x.png 2x"
      media="(min-width: 768px)"
      />
      <source
      srcset="./images/not-found-mobile-1x.png 1x, ./images/not-found-mobile-2x.png 2x"
      media="(max-width: 767px)"
      />
      <img class="not__found__image" src="./images/not-found-desktop-1x.png" alt="not found image">
  </picture>
</div>`}function S(e){const n=e.flat();return console.log("cropped",n),[...n].slice(1,36)}G.addEventListener("click",ve);function ve(e){if(!e.target.classList.contains("calendar__date"))return;const t=e.target,a=document.querySelector(".calendar__date--active"),r=new Date(e.target.id);console.log("selectedDate",r),console.log("todayDate",new Date),a===t?(M.value="",a.classList.remove("calendar__date--active")):a!==t&&r>new Date?(console.log("selectedDate > new Date()",r>new Date),ye(),N(),I(t)):(N(),I(t))}function N(){const e=document.querySelector(".calendar__date.calendar__date--active");e&&e.classList.remove("calendar__date--active")}function we(e){const n=e.id.split("-").reverse().join("/");return M.value=n,n}function I(e){e.classList.add("calendar__date--active"),we(e),K()}pe();const h="/goit-js66-team-project/assets/icon-sprites-da59ca18.svg";document.querySelector("main");const J="419bd34d8daba21c0a4890e35d027d3f";document.addEventListener("DOMContentLoaded",be);function U(e){Oe(e).then(t=>{t!==void 0&&xe(t)})}function be(){navigator.geolocation?navigator.geolocation.getCurrentPosition(Se,De):alert("Your browser does not support geolocation")}function Se(e){const{latitude:n,longitude:t}=e.coords,a=`https://api.openweathermap.org/data/2.5/weather?lat=${n}&lon=${t}&units=metric&appid=${J}`;U(a)}function xe(e){const{name:n}=e,{temp:t}=e.main,{main:a,icon:r}=e.weather[0],i=new Date,{dayOfWeek:o,dateOfWeek:s,monthOfWeek:c}=Ee(i.toUTCString()),l=$e(s,c,i),u={temp:Math.floor(t),typeWeather:a,city:n,srcIcon:Ae(r),dayOfWeak:o,dateOfWeak:l,imgOpacity:"",dateOpacity:"",splitterOpacity:"",typegroupOpacity:"",textSymbol:"&#176;"};V(u)}function $e(e,n,t){return e+" "+n+" "+t.getFullYear()}function Ae(e){return`https://openweathermap.org/img/wn/${e}.png`}function Oe(e){return fetch(e).then(t=>{if(t.ok)return t.json();V({temp:"no-",typeWeather:"",city:"",srcIcon:"",dayOfWeak:"",dateOfWeak:"",imgOpacity:" opacityElement",dateOpacity:" opacityElement",splitterOpacity:" opacityElement",typegroupOpacity:" opacityElement",textSymbol:"data"})})}function V(e){const n=Le(e);new MutationObserver((a,r)=>{let i=[];a.forEach(o=>{if(o.type==="childList"&&o.addedNodes.length>0){const s=document.querySelectorAll(".article");s&&s.forEach((c,l)=>{l===1&&(i=c,r.disconnect())})}}),setTimeout(i.insertAdjacentHTML("afterend",n),10)}).observe(document.body,{childList:!0,subtree:!0})}function Ee(e){const n=e.indexOf(","),t=e.substr(0,n).trim(),a=e.substr(n+1).trim(),r=a.indexOf(" "),i=a.substr(0,r).trim(),o=a.substr(r+1).trim(),s=o.indexOf(" "),c=o.substr(0,s).trim();return{dayOfWeek:t,monthOfWeek:c,dateOfWeek:i}}function De(){const e=`https://api.openweathermap.org/data/2.5/weather?q=lONDON&lang=en&units=metric&appid=${J}`;U(e)}function Le(e){const{temp:n,typeWeather:t,city:a,srcIcon:r,dayOfWeak:i,dateOfWeak:o,imgOpacity:s,dateOpacity:c,splitterOpacity:l,typegroupOpacity:u,textSymbol:d}=e;return'<li class="weather"><div class="weather__group"><div class="weather__temperaturedate"><span class="weather__temperature">'+String(n)+'</span><span class="weather__symbol" >'+d+'</span></div ><div class="weather__splitter'+l+'"></div > <div class="weather__typegroup'+u+'"><span class="weather__type">'+String(t)+`</span > <div class="weather__citygroup"><svg class="weather__svg"><use href="${h}#location"></use></svg > <p class="weather__city">`+String(a)+'</p > </div ></div ></div ><div class="weather__img'+s+'"><img class="weather__imgvalue" src="'+String(r)+'" alt=""></div ><div class="weather__date'+c+'"><span class="weather__dayofweek">'+String(i)+'</span > <span class="weather__dateofweek">'+String(o)+'</span></div><div class="weather__refgroup"><a class="weather__ref" href="https://sinoptik.ua/" rel="noopener noreferrer" target="_blank">weather for week</a ></div ></li > '}const ke="api-key=9GYTd3hNgT1cJMME7q1HMJAu02NGsmfm",Ce="https://api.nytimes.com";function Me(){try{return fetch(`${Ce}/svc/mostpopular/v2/viewed/1.json?${ke}`).then(e=>{if(!e.ok)throw new Error("Such a request has not been found");return e.json()}).then(({results:e})=>e)}catch(e){console.log(e.message)}}class T{constructor(){this.API_KEY="api-key=9GYTd3hNgT1cJMME7q1HMJAu02NGsmfm",this.API_HOST="https://api.nytimes.com",this.WEB_HOST="https://www.nytimes.com",this.BASE_ENDPOINT_URL=`${this.API_HOST}/svc/topstories/v2/arts.json?${this.API_KEY}`,this.SEARCH_ENDPOINT_URL=`${this.API_HOST}/svc/search/v2/articlesearch.json?`,this.SEARCH_CATEGORI=`${this.API_HOST}/svc/news/v3/content/section-list.json?${this.API_KEY}`,this.CATEGORY_END_POINT=`${this.API_HOST}/svc/news/v3/content/all/`}}const W=document.querySelector(".articles_container"),A=new T,O=document.querySelector(".not-found"),Te=document.querySelector(".page-header__search-input");Te.addEventListener("change",Pe);function Pe(e){const n=e.target.value;console.log(n),je(n)}const je=async e=>{try{const n=await fetch(`${A.SEARCH_ENDPOINT_URL}q=${e}&${A.API_KEY}`);if(n.ok===!1)throw new Error("Such a request has not been found");const a=(await n.json()).response.docs;a.length?(O.classList.add("is-hidden"),qe(a)):a.length===0&&We(),console.log(a)}catch(n){console.log(n)}};function qe(e){const n=e.map(t=>t.multimedia.length===0?{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date,imgCaption:t.lead_paragraph,img:"https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png"}:{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date,imgCaption:t.lead_paragraph,img:`${A.WEB_HOST}/${t.multimedia[1].url}`});console.log(n),Ne(n)}function Ne(e){const n=e.map(t=>{if(!t)return;const{section:a,title:r,description:i,url:o,date:s,img:c,imgCaption:l}=t;return`<li class="article">
     <div class="article_img_wrapper">
       <p class="already-read">Already read</p>
       <p class="article_category">${a}</p>
       <img class="article_img" src="${c}" alt="${l}" width="395" height="395">
       <div class="article_flag">
       <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${h}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${h}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${r}</h2>
       <p class="article_text">${i}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${s}</p>
       <a href="${o}" class="read-more">Read more</a>
     </div>
     </li>`}).join("");return Ie(n)}function Ie(e){W.innerHTML="",W.insertAdjacentHTML("beforeend",e)}function We(){O.classList.contains("is-hidden")&&O.classList.remove("is-hidden")}const He=new T;let m=[];p.btnOpenModal.forEach(e=>{e.addEventListener("click",Re)});function Re(){p.btnOpenModal.forEach(e=>{e.classList.toggle("isActiveBtn")}),p.listConteinerEl.classList.toggle("is-open"),p.listConteinerEl.classList.toggle("list-container--animation")}const Be=async()=>{try{const e=await fetch(`${He.SEARCH_CATEGORI}`);if(e.ok===!1)throw new Error("Such a request has not been found");return await(await e.json()).results}catch(e){console.log(e.message)}};Be().then(e=>{if(e.forEach(n=>{m.push(n)}),p.viewportWidth<768)p.listConteinerEl.innerHTML=x(e);else if(p.viewportWidth>=768){const n=[];p.categoryBtns.forEach((t,a)=>{t.textContent=e[a].display_name,a=4});for(let t=6;t<m.length;t++)n.push(m[t]);p.listConteinerEl.innerHTML=x(n)}else if(p.viewportWidth>=1280){const n=[];p.categoryBtns.forEach((t,a)=>{t.textContent=e[a].display_name,a=5});for(let t=5;t<m.length;t++)n.push(m[t]);p.listConteinerEl.innerHTML=x(n)}});function x(e){return`<div class="rest__wrapper"><ul class="rest__list list">${e.map(t=>`<li class="rest__item item">${t.display_name}</li>`).join("")}</ul></div >`}const H=new T,R=document.querySelector(".articles_container"),Ye=document.querySelector(".js-category__wrap");Ye.addEventListener("click",Fe);function Fe(e){if(e.preventDefault(),!e.target.className.includes("js-category__btn")&&!e.target.className.includes("rest__item"))return;const n=e.target.textContent,t=encodeURIComponent(n.toLowerCase());Ge(t)}async function Ge(e){try{const a=(await(await fetch(`${H.CATEGORY_END_POINT}${e}.json?${H.API_KEY}`)).json()).results;Ke(a)}catch(n){console.log(n)}}function Ke(e){try{const n=e.map(t=>t.multimedia===null?{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date,imgCaption:t.title,img:"https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png"}:{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date,imgCaption:t.multimedia[2].caption,img:t.multimedia[2].url});Je(n)}catch(n){console.error(n)}}function Je(e){const n=e.map(t=>{if(!t)return;const{section:a,title:r,description:i,url:o,date:s,img:c,imgCaption:l}=t;return`<li class="article">
     <div class="article_img_wrapper">
       <p class="already-read">Already read</p>
       <p class="article_category">${a}</p>
       <img class="article_img" src="${c}" alt="${l}" width="395" height="395">
       <div class="article_flag">
       <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${h}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${h}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${r}</h2>
       <p class="article_text">${i}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${s}</p>
       <a href="${o}" class="read-more">Read more</a>
     </div>
     </li>`}).join("");return Ue(n)}function Ue(e){R.innerHTML="",R.insertAdjacentHTML("beforeend",e)}function Ve(e){return ze(e).map(t=>{if(!t)return;const{section:a,title:r,description:i,url:o,date:s,img:c,imgCaption:l}=t;return`<li class="article">
     <div class="article_img_wrapper">
       <p class="already-read">Already read</p>
       <p class="article_category">${a}</p>
       <img class="article_img" src="${c}" alt="${l}" width="395" height="395">
       <div class="article_flag">
       <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${h}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${h}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${r}</h2>
       <p class="article_text">${i}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${s}</p>
       <a href="${o}" class="read-more" target="_blank">Read more</a>
     </div>
     </li>`}).join("")}function ze(e){try{const n=e.map(t=>t.media.length===0?{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date||t.published_date,img:"https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png",imgCaption:"image"}:{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date||t.published_date,img:t.media[0]["media-metadata"][2].url,imgCaption:t.media[0].caption});return console.log(n),n}catch(n){console.error(n)}}const B=document.querySelector(".articles_container");document.addEventListener("DOMContentLoaded",Qe);function Qe(e){e.preventDefault(),Me().then(n=>Ve(n)).then(n=>{B.insertAdjacentHTML("beforeend",n)}).then(()=>{const n=[...B.querySelectorAll(".article_text")];Xe(n)})}function Xe(e){e.forEach(n=>{if(n.textContent.length>150){const t=n.textContent.slice(0,150);n.textContent=`${t}...`}})}const E=document.getElementById("pagination"),D=document.querySelector("button.next-page"),L=document.querySelector("button.prev-page"),g={curPage:1,numLinksTwoSide:1,totalPages:10};P();E.addEventListener("click",e=>{if(e.target.dataset.page){const t=parseInt(e.target.dataset.page,10);g.curPage=t,P(),console.log(g),z(),Q()}});function P(){const{totalPages:e,curPage:n,numLinksTwoSide:t}=g,a=t+4;let r="",i="",o='<li class="pg-item"><a class="pg-link">...</a></li>',s=0;const c=n-t,l=n+t;let u="";for(let d=1;d<=e;d++)u=d===n?"active":"",e>=2*a-1?c>3&&l<e-3+1?d>=c&&d<=l&&(i+=_(d,u)):n<a&&d<=a||n>e-a&&d>=e-a+1||d===e||d===1?r+=_(d,u):(s++,s===1&&(r+=o)):r+=_(d,u);i?(i=_(1)+o+i+o+_(e),E.innerHTML=i):E.innerHTML=r}function _(e,n=""){return` <li class="pg-item ${n}" data-page="${e}">
        <a class="pg-link" href="#">${e}</a>
    </li>`}document.querySelector(".page-container").addEventListener("click",function(e){Ze(e.target)});function Ze(e){e.classList.contains("first-page")?g.curPage=1:e.classList.contains("last-page")?g.curPage=10:e.classList.contains("prev-page")?(g.curPage--,z(),D.disabled=!1):e.classList.contains("next-page")&&(g.curPage++,Q(),L.disabled=!1),P()}function z(){g.curPage===1?L.disabled=!0:L.disabled=!1}function Q(){g.curPage===g.totalPages?(console.log(g.curPage),D.disabled=!0):D.disabled=!1}const X="read-articles",et=document.querySelector("body");et.addEventListener("click",tt);const y=[];function tt(e){const n=new Date;return console.log(n.toDateString()),y.push(nt(e)),at(X,JSON.stringify(y)),y}function nt(e){if(!e.target.classList.contains("read-more"))return;const n=new Object,t=new Date;return n.readDate=t.toDateString(),console.log(n.readDate),n.date=e.target.previousElementSibling.textContent,n.img=e.target.parentNode.parentNode.firstElementChild.children[2].getAttribute("src"),n.imgCaption=e.target.parentNode.parentNode.firstElementChild.children[2].getAttribute("alt"),n.section=e.target.parentNode.parentNode.firstElementChild.children[1].textContent,n.title=e.target.parentNode.parentNode.firstElementChild.nextElementSibling.firstElementChild.textContent,n.description=e.target.parentNode.parentNode.firstElementChild.nextElementSibling.lastElementChild.textContent,n.url=e.target.getAttribute("href"),console.log(n),n}console.log(y);function at(e,n){localStorage.setItem(e,`${n}`)}function rt(){const e=JSON.parse(localStorage.getItem(X));console.log(e);const n=e.map(t=>{if(!t)return;const{section:a,title:r,description:i,date:o,img:s,readDate:c,url:l,imgCaption:u}=t;return`<li class="article">
     <div class="article_img_wrapper">
       <p class="already-read">Already read</p>
       <p class="article_category">${a}</p>
       <img class="article_img" src="${s[s.length-1].url}" alt="${u}" width="395" height="395">
       <div class="article_flag">
       <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${h}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${h}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${r}</h2>
       <p class="article_text">${i}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${o}</p>
       <a href="${l}" class="read-more" target="blank">Read more</a>
     </div>
     </li>`}).join("");return console.log(n),n}const it=document.querySelector(".read-output"),ot=document.querySelector("#read-link");ot.addEventListener("click",st);function st(e){console.log(e),ct(rt())}function ct(e){it.insertAdjacentHTML("afterend",e)}
