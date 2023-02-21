(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const p={categoryBtnEl:document.querySelector(".category__btn"),listConteinerEl:document.querySelector(".js-list-container"),btnOpenModal:document.querySelectorAll(".js-open-list"),viewportWidth:window.innerWidth,sectionRestList:document.querySelector(".rest__list"),categoryWrap:document.querySelector(".js-category__wrap"),categoryBtns:document.querySelectorAll(".js-category__btn")},F={search:document.querySelector(".js-search"),burgerMenu:document.querySelector(".js-menu-open"),searchInput:document.querySelector(".js-search-input"),body:document.querySelector("body")};F.search.addEventListener("click",ae);function ae(e){e.preventDefault(),F.searchInput.innerHTML='<input type="search" placeholder="Search" class="page-header__search-input">'}function re(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var ie="previous",oe="current",se="next",j=function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0";return e<10?n+e:e},C=function(e){return"".concat(e.getFullYear(),"-").concat(j(e.getMonth()+1),"-").concat(j(e.getDate()))},G=function(e){return new Date(e.getFullYear(),e.getMonth()+1,0).getDate()},N=function(e){return new Promise(function(n){var t=[],a=le(e).map(function(o){return{date:o.date,iso:o.iso,type:ie}}),r=ce(e).map(function(o){return{date:o.date,iso:o.iso,type:oe}});t=t.concat(a).concat(r);var i=de(e,t.length).map(function(o){return{date:o.date,iso:o.iso,type:se}});n(t.concat(i))})},M=function(e){return function(n){return Array(e).fill().map(n)}},ce=function(e){var n=G(e);return M(n)(function(t,a){var r=a+1;return e.setDate(r),{date:r,iso:C(e)}})},le=function(e){var n,t,a=e.getMonth(),r=e.getFullYear(),i=Math.min(a-1,11),o=new Date(r,i),s=G(o),c=s-(n=e,t=new Date(n.getFullYear(),n.getMonth(),1).toDateString().substring(0,3),["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(t))+1;return M(s-c+1)(function(l,u){var d=c+u;return o.setDate(d),{date:d,iso:C(o)}})},de=function(e,n){var t=42-n,a=e.getMonth()+1===12?0:e.getMonth()+1,r=a===0?e.getFullYear()+1:e.getFullYear(),i=new Date(r,a);return M(t)(function(o,s){var c=s+1;return i.setDate(c),{date:c,iso:C(i)}})},ue=function(){function e(){(function(a,r){if(!(a instanceof r))throw new TypeError("Cannot call a class as a function")})(this,e)}var n,t;return n=e,(t=[{key:"getDates",value:function(a){return new Promise(function(r){return r(N(a).then(function(i){return i.map(function(o){return o})}))})}},{key:"getMatrix",value:function(a){return new Promise(function(r){r(N(a).then(function(i){return i.reduce(function(o,s,c){return(c%7==0?o.push([s]):o[o.length-1].push(s))&&o},[])}))})}}])&&re(n.prototype,t),Object.defineProperty(n,"prototype",{writable:!1}),e}(),pe=ue;const ge="api-key=9GYTd3hNgT1cJMME7q1HMJAu02NGsmfm",fe="https://api.nytimes.com";function K(){try{return fetch(`${fe}/svc/mostpopular/v2/viewed/1.json?${ge}`).then(e=>{if(!e.ok)throw new Error("Such a request has not been found");return e.json()}).then(({results:e})=>e)}catch(e){console.log(e.message)}}const h="/goit-js66-team-project/assets/icon-sprites-da59ca18.svg";function J(e){return he(e).map(t=>{if(!t)return;const{section:a,title:r,description:i,url:o,date:s,img:c,imgCaption:l}=t;return`<li class="article">
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
     </li>`}).join("")}function he(e){try{const n=e.map(t=>t.media.length===0?{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date||t.published_date,img:"https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png",imgCaption:"image"}:{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date||t.published_date,img:t.media[0]["media-metadata"][2].url,imgCaption:t.media[0].caption});return console.log(n),n}catch(n){console.error(n)}}const I=document.querySelector(".articles_container");document.addEventListener("DOMContentLoaded",me);function me(e){e.preventDefault(),K().then(n=>J(n)).then(n=>{I.insertAdjacentHTML("beforeend",n)}).then(()=>{const n=[...I.querySelectorAll(".article_text")];U(n)})}function U(e){e.forEach(n=>{if(n.textContent.length>150){const t=n.textContent.slice(0,150);n.textContent=`${t}...`}})}const v=new pe,$=document.querySelector(".articles_container"),A=document.querySelector(".js-open-calendar"),T=document.querySelector(".calendar__input"),V=document.querySelector(".js-calendar-container"),_e=document.querySelector(".calendar__month-btn--next"),ye=document.querySelector(".calendar__month-btn--prev"),ve=document.querySelector(".calendar__year-btn"),f=["January","February","March","April","May","June","July","August","September","October","November","December"];ve.addEventListener("click",Ae);_e.addEventListener("click",be);ye.addEventListener("click",Se);A.addEventListener("click",z);function z(){const e=T.getAttribute("aria-expanded")==="true"||!1;A.setAttribute("aria-expanded",!e),A.classList.toggle("reversed"),V.classList.toggle("is-open")}const we=async()=>{const e=await v.getMatrix(new Date);console.log("🚀 ~ file: calendar.js:17 ~ main ~ datesArr",e);const n=new Date,t=[f[n.getMonth()],n.getFullYear()],a=S(e);b(a),w(t)};async function be(){const n=document.querySelector(".calendar__month").textContent.split(" ");let t=$e(n);const a=await v.getMatrix(new Date(`${n[1]}, ${f[t]}`)),r=S(a);console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr",r),b(r),w([f[t],n[1]])}async function Se(){const n=document.querySelector(".calendar__month").textContent.split(" ");let t=xe(n);const a=await v.getMatrix(new Date(`${n[1]}, ${f[t]}`)),r=S(a);console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr",r),b(r),w([f[t],n[1]])}function xe(e){let n=f.indexOf(e[0]);return console.log("date:",e),console.log("index:",n),n===0?(n=11,e[1]=+e[1]-1,console.log("date:",e)):n-=1,n}function $e(e){let n=f.indexOf(e[0]);return console.log("date:",e),n===11?(n=0,e[1]=+e[1]+1,console.log("date:",e)):n+=1,n}async function Ae(){const n=document.querySelector(".calendar__month").textContent.split(" ");n[1]=+n[1]+1;let t=f.indexOf(n[0]);const a=await v.getMatrix(new Date(`${n[1]}, ${f[t]}`)),r=S(a);console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr",r),b(r),w([f[t],n[1]])}function w([e,n]){const t=document.querySelector(".calendar__body-caption"),a=t.querySelector("p");a&&a.remove(),t.insertAdjacentHTML("afterbegin",`<p class="calendar__month">${e} ${n}</p>`)}function b(e){const n=document.querySelector(".calendar__list"),t=new Date,a=t.getDate();n.innerHTML=`${e.map(r=>{const i=new Date(r.iso).getDay();return a===r.date?`<li id="${r.iso}" class="calendar__date calendar__date--active">${r.date}</li>`:+t<new Date(r.iso)?`<li id="${r.iso}" class="calendar__date calendar__date--inactive">${r.date}</li>`:i===6||i===0?`<li id="${r.iso}" class="calendar__date calendar__date--weekend">${r.date}</li>`:`<li id="${r.iso}" class="calendar__date">${r.date}</li>`}).join("")}`}function Oe(){return document.querySelector(".news-gallery"),$.innerHTML=`<div class="container">
  <h2 class="not__found__title">We couldn't find news from the future ;) Please, pick another date! </h2>
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
</div>`}function S(e){const n=e.flat();return console.log("cropped",n),[...n].slice(1,36)}V.addEventListener("click",Ee);function Ee(e){if(!e.target.classList.contains("calendar__date"))return;const t=e.target,a=document.querySelector(".calendar__date--active"),r=new Date(e.target.id);console.log("selectedDate",r),console.log("todayDate",new Date),a===t?(T.value="",a.classList.remove("calendar__date--active")):a!==t&&r>new Date?(console.log("selectedDate > new Date()",r>new Date),Oe(),W(),H(t)):(W(),H(t),ke())}function W(){const e=document.querySelector(".calendar__date.calendar__date--active");e&&e.classList.remove("calendar__date--active")}function Le(e){const n=e.id.split("-").reverse().join("/");return T.value=n,n}function ke(){console.log(23),K().then(e=>J(e)).then(e=>{console.log(e),$.innerHTML=e}).then(()=>{const e=[...$.querySelectorAll(".article_text")];U(e)})}function H(e){e.classList.add("calendar__date--active"),Le(e),z()}we();document.querySelector("main");const Q="419bd34d8daba21c0a4890e35d027d3f";document.addEventListener("DOMContentLoaded",De);function X(e){qe(e).then(t=>{t!==void 0&&Me(t)})}function De(){navigator.geolocation?navigator.geolocation.getCurrentPosition(Ce,Ne):alert("Your browser does not support geolocation")}function Ce(e){const{latitude:n,longitude:t}=e.coords,a=`https://api.openweathermap.org/data/2.5/weather?lat=${n}&lon=${t}&units=metric&appid=${Q}`;X(a)}function Me(e){const{name:n}=e,{temp:t}=e.main,{main:a,icon:r}=e.weather[0],i=new Date,{dayOfWeek:o,dateOfWeek:s,monthOfWeek:c}=je(i.toUTCString()),l=Te(s,c,i),u={temp:Math.floor(t),typeWeather:a,city:n,srcIcon:Pe(r),dayOfWeak:o,dateOfWeak:l,imgOpacity:"",dateOpacity:"",splitterOpacity:"",typegroupOpacity:"",textSymbol:"&#176;"};Z(u)}function Te(e,n,t){return e+" "+n+" "+t.getFullYear()}function Pe(e){return`https://openweathermap.org/img/wn/${e}.png`}function qe(e){return fetch(e).then(t=>{if(t.ok)return t.json();Z({temp:"no-",typeWeather:"",city:"",srcIcon:"",dayOfWeak:"",dateOfWeak:"",imgOpacity:" opacityElement",dateOpacity:" opacityElement",splitterOpacity:" opacityElement",typegroupOpacity:" opacityElement",textSymbol:"data"})})}function Z(e){const n=Ie(e);new MutationObserver((a,r)=>{let i=[];a.forEach(o=>{if(o.type==="childList"&&o.addedNodes.length>0){const s=document.querySelectorAll(".article");s&&s.forEach((c,l)=>{l===1&&(i=c,r.disconnect())})}}),setTimeout(i.insertAdjacentHTML("afterend",n),10)}).observe(document.body,{childList:!0,subtree:!0})}function je(e){const n=e.indexOf(","),t=e.substr(0,n).trim(),a=e.substr(n+1).trim(),r=a.indexOf(" "),i=a.substr(0,r).trim(),o=a.substr(r+1).trim(),s=o.indexOf(" "),c=o.substr(0,s).trim();return{dayOfWeek:t,monthOfWeek:c,dateOfWeek:i}}function Ne(){const e=`https://api.openweathermap.org/data/2.5/weather?q=lONDON&lang=en&units=metric&appid=${Q}`;X(e)}function Ie(e){const{temp:n,typeWeather:t,city:a,srcIcon:r,dayOfWeak:i,dateOfWeak:o,imgOpacity:s,dateOpacity:c,splitterOpacity:l,typegroupOpacity:u,textSymbol:d}=e;return'<li class="weather"><div class="weather__group"><div class="weather__temperaturedate"><span class="weather__temperature">'+String(n)+'</span><span class="weather__symbol" >'+d+'</span></div ><div class="weather__splitter'+l+'"></div > <div class="weather__typegroup'+u+'"><span class="weather__type">'+String(t)+`</span > <div class="weather__citygroup"><svg class="weather__svg"><use href="${h}#location"></use></svg > <p class="weather__city">`+String(a)+'</p > </div ></div ></div ><div class="weather__img'+s+'"><img class="weather__imgvalue" src="'+String(r)+'" alt=""></div ><div class="weather__date'+c+'"><span class="weather__dayofweek">'+String(i)+'</span > <span class="weather__dateofweek">'+String(o)+'</span></div><div class="weather__refgroup"><a class="weather__ref" href="https://sinoptik.ua/" rel="noopener noreferrer" target="_blank">weather for week</a ></div ></li > '}class P{constructor(){this.API_KEY="api-key=9GYTd3hNgT1cJMME7q1HMJAu02NGsmfm",this.API_HOST="https://api.nytimes.com",this.WEB_HOST="https://www.nytimes.com",this.BASE_ENDPOINT_URL=`${this.API_HOST}/svc/topstories/v2/arts.json?${this.API_KEY}`,this.SEARCH_ENDPOINT_URL=`${this.API_HOST}/svc/search/v2/articlesearch.json?`,this.SEARCH_CATEGORI=`${this.API_HOST}/svc/news/v3/content/section-list.json?${this.API_KEY}`,this.CATEGORY_END_POINT=`${this.API_HOST}/svc/news/v3/content/all/`}}const R=document.querySelector(".articles_container"),O=new P,E=document.querySelector(".not-found"),We=document.querySelector(".page-header__search-input");We.addEventListener("change",He);function He(e){const n=e.target.value;console.log(n),Re(n)}const Re=async e=>{try{const n=await fetch(`${O.SEARCH_ENDPOINT_URL}q=${e}&${O.API_KEY}`);if(n.ok===!1)throw new Error("Such a request has not been found");const a=(await n.json()).response.docs;a.length?(E.classList.add("is-hidden"),Be(a)):a.length===0&&Ge(),console.log(a)}catch(n){console.log(n)}};function Be(e){const n=e.map(t=>t.multimedia.length===0?{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date,imgCaption:t.lead_paragraph,img:"https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png"}:{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date,imgCaption:t.lead_paragraph,img:`${O.WEB_HOST}/${t.multimedia[1].url}`});console.log(n),Ye(n)}function Ye(e){const n=e.map(t=>{if(!t)return;const{section:a,title:r,description:i,url:o,date:s,img:c,imgCaption:l}=t;return`<li class="article">
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
     </li>`}).join("");return Fe(n)}function Fe(e){R.innerHTML="",R.insertAdjacentHTML("beforeend",e)}function Ge(){E.classList.contains("is-hidden")&&E.classList.remove("is-hidden")}const Ke=new P;let m=[];p.btnOpenModal.forEach(e=>{e.addEventListener("click",Je)});function Je(){p.btnOpenModal.forEach(e=>{e.classList.toggle("isActiveBtn")}),p.listConteinerEl.classList.toggle("is-open"),p.listConteinerEl.classList.toggle("list-container--animation")}const Ue=async()=>{try{const e=await fetch(`${Ke.SEARCH_CATEGORI}`);if(e.ok===!1)throw new Error("Such a request has not been found");return await(await e.json()).results}catch(e){console.log(e.message)}};Ue().then(e=>{if(e.forEach(n=>{m.push(n)}),p.viewportWidth<768)p.listConteinerEl.innerHTML=x(e);else if(p.viewportWidth>=768){const n=[];p.categoryBtns.forEach((t,a)=>{t.textContent=e[a].display_name,a=4});for(let t=6;t<m.length;t++)n.push(m[t]);p.listConteinerEl.innerHTML=x(n)}else if(p.viewportWidth>=1280){const n=[];p.categoryBtns.forEach((t,a)=>{t.textContent=e[a].display_name,a=5});for(let t=5;t<m.length;t++)n.push(m[t]);p.listConteinerEl.innerHTML=x(n)}});function x(e){return`<div class="rest__wrapper"><ul class="rest__list list">${e.map(t=>`<li class="rest__item item">${t.display_name}</li>`).join("")}</ul></div >`}const B=new P,Y=document.querySelector(".articles_container"),Ve=document.querySelector(".js-category__wrap");Ve.addEventListener("click",ze);function ze(e){if(e.preventDefault(),!e.target.className.includes("js-category__btn")&&!e.target.className.includes("rest__item"))return;const n=e.target.textContent,t=encodeURIComponent(n.toLowerCase());Qe(t)}async function Qe(e){try{const a=(await(await fetch(`${B.CATEGORY_END_POINT}${e}.json?${B.API_KEY}`)).json()).results;Xe(a)}catch(n){console.log(n)}}function Xe(e){try{const n=e.map(t=>t.multimedia===null?{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date,imgCaption:t.title,img:"https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png"}:{section:t.section_name||t.section,title:t.title||t.headline.main,description:t.abstract,url:t.web_url||t.url,date:t.pub_date||t.created_date,imgCaption:t.multimedia[2].caption,img:t.multimedia[2].url});Ze(n)}catch(n){console.error(n)}}function Ze(e){const n=e.map(t=>{if(!t)return;const{section:a,title:r,description:i,url:o,date:s,img:c,imgCaption:l}=t;return`<li class="article">
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
     </li>`}).join("");return et(n)}function et(e){Y.innerHTML="",Y.insertAdjacentHTML("beforeend",e)}const L=document.getElementById("pagination"),k=document.querySelector("button.next-page"),D=document.querySelector("button.prev-page"),g={curPage:1,numLinksTwoSide:1,totalPages:10};q();L.addEventListener("click",e=>{if(e.target.dataset.page){const t=parseInt(e.target.dataset.page,10);g.curPage=t,q(),console.log(g),ee(),te()}});function q(){const{totalPages:e,curPage:n,numLinksTwoSide:t}=g,a=t+4;let r="",i="",o='<li class="pg-item"><a class="pg-link">...</a></li>',s=0;const c=n-t,l=n+t;let u="";for(let d=1;d<=e;d++)u=d===n?"active":"",e>=2*a-1?c>3&&l<e-3+1?d>=c&&d<=l&&(i+=_(d,u)):n<a&&d<=a||n>e-a&&d>=e-a+1||d===e||d===1?r+=_(d,u):(s++,s===1&&(r+=o)):r+=_(d,u);i?(i=_(1)+o+i+o+_(e),L.innerHTML=i):L.innerHTML=r}function _(e,n=""){return` <li class="pg-item ${n}" data-page="${e}">
        <a class="pg-link" href="#">${e}</a>
    </li>`}document.querySelector(".page-container").addEventListener("click",function(e){tt(e.target)});function tt(e){e.classList.contains("first-page")?g.curPage=1:e.classList.contains("last-page")?g.curPage=10:e.classList.contains("prev-page")?(g.curPage--,ee(),k.disabled=!1):e.classList.contains("next-page")&&(g.curPage++,te(),D.disabled=!1),q()}function ee(){g.curPage===1?D.disabled=!0:D.disabled=!1}function te(){g.curPage===g.totalPages?(console.log(g.curPage),k.disabled=!0):k.disabled=!1}const ne="read-articles",nt=document.querySelector("body");nt.addEventListener("click",at);const y=[];function at(e){const n=new Date;return console.log(n.toDateString()),y.push(rt(e)),it(ne,JSON.stringify(y)),y}function rt(e){if(!e.target.classList.contains("read-more"))return;const n=new Object,t=new Date;return n.readDate=t.toDateString(),console.log(n.readDate),n.date=e.target.previousElementSibling.textContent,n.img=e.target.parentNode.parentNode.firstElementChild.children[2].getAttribute("src"),n.imgCaption=e.target.parentNode.parentNode.firstElementChild.children[2].getAttribute("alt"),n.section=e.target.parentNode.parentNode.firstElementChild.children[1].textContent,n.title=e.target.parentNode.parentNode.firstElementChild.nextElementSibling.firstElementChild.textContent,n.description=e.target.parentNode.parentNode.firstElementChild.nextElementSibling.lastElementChild.textContent,n.url=e.target.getAttribute("href"),console.log(n),n}console.log(y);function it(e,n){localStorage.setItem(e,`${n}`)}function ot(){const e=JSON.parse(localStorage.getItem(ne));console.log(e);const n=e.map(t=>{if(!t)return;const{section:a,title:r,description:i,date:o,img:s,readDate:c,url:l,imgCaption:u}=t;return`<li class="article">
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
     </li>`}).join("");return console.log(n),n}const st=document.querySelector(".read-output"),ct=document.querySelector("#read-link");ct.addEventListener("click",lt);function lt(e){console.log(e),dt(ot())}function dt(e){st.insertAdjacentHTML("afterend",e)}
