import"./icon-sprites-033c7d49.js";import{c as l}from"./markup-d5f3e183.js";const i="read-articles";document.addEventListener("DOMContentLoaded",o=>{var c;o.preventDefault(),document.querySelector("#read-articles").innerHTML=d(),document.querySelector("[data-toggle]").classList.add("is-active"),(c=document.querySelectorAll("[data-toggle]"))==null||c.forEach(t=>{t.addEventListener("click",()=>{t.classList.toggle("is-active")})})});function d(){const c=JSON.parse(localStorage.getItem(i)).sort((e,r)=>new Date(r.readDate)-new Date(e.readDate)),t={};let n="";c.forEach(e=>{const r=new Date(e.readDate),s=`${String(r.getDate()).padStart(2,"0")}/${String(r.getMonth()+1).padStart(2,"0")}/${r.getFullYear()}`;n!==s&&(t[s]=[],n=s),t[s].push(e)});let a="";for(const e in t)a+='<section class="articles-group">',a+=`<header class="articles-group__header" data-toggle="${e}"><h3>${e}</h3></header>`,a+=`<div class="articles-group__pane" data-pane="${e}"><ul class="articles_container">`,a+=l(t[e],!1),a+="</ul></div></section>";return a}