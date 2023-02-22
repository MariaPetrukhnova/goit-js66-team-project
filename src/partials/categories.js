import NewsApi from './apiConstructor.js';
const apiGetCatigorie = new NewsApi();
let apiGetCatigorieResult = [];
refsEl.btnOpenModal.forEach(element => {
    element.addEventListener("click", handleClick)

});
function handleClick() {
    refsEl.btnOpenModal.forEach(element => {
        element.classList.toggle("isActiveBtn");

    });
    refsEl.listConteinerEl.classList.toggle("is-open");
    refsEl.listConteinerEl.classList.toggle("list-container--animation");
}

const fetchCategories = async () => {
    try {
        const response = await fetch(
            `${apiGetCatigorie.SEARCH_CATEGORI}`
        );
        if (response.ok === false) {
            throw new Error('Such a request has not been found');
        }
        const category = await response.json();
        const result = await category.results;

        return result;
    } catch (error) {
        console.log(error.message);
    }

}
fetchCategories().then(result => {
    result.forEach(element => {
        apiGetCatigorieResult.push(element);
    })

    if (refsEl.viewportWidth < 768) {
        refsEl.listConteinerEl.innerHTML = mobMarkup(result);
    }
    else if (refsEl.viewportWidth >= 768) {
        const element = []
        refsEl.categoryBtns.forEach((element, i) => {
            element.textContent = result[i].display_name;
            if (i = 4) {
                return
            }
        });
        for (let i = 6; i < apiGetCatigorieResult.length; i++) {

            element.push(apiGetCatigorieResult[i]);

        }
        refsEl.listConteinerEl.innerHTML = mobMarkup(element);
    }
    else if (refsEl.viewportWidth >= 1280) {
        const element = []
        refsEl.categoryBtns.forEach((element, i) => {
            element.textContent = result[i].display_name;
            if (i = 5) {
                return
            }
        });
        for (let i = 5; i < apiGetCatigorieResult.length; i++) {

            element.push(apiGetCatigorieResult[i]);

        }
        refsEl.listConteinerEl.innerHTML = mobMarkup(element);
    }
})
function mobMarkup(arr) {
    const arrSections = arr.map(section =>
        `<li class="rest__item item js-search">${section.display_name}</li>`
    ).join("");
    return `<div class="rest__wrapper"><ul class="rest__list list">${arrSections}</ul></div >`
}
refsEl.listConteinerEl.addEventListener("click", mouseOuter)
function mouseOuter() {
    refsEl.btnOpenModal.forEach(element => {
        element.classList.remove("isActiveBtn");

    });
    refsEl.listConteinerEl.classList.remove("is-open");
}


import { refsEl } from "./refs";

