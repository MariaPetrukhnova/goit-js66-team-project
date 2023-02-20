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
        `<li class="rest__item item">${section.display_name}</li>`
    ).join("");
    return `<div class="rest__wrapper"><ul class="rest__list list">${arrSections}</ul></div >`
}
// fetchCategories().then(result => {
//     if (refsEl.viewportWidth < 768) {
//         refsEl.listConteinerEl.insertAdjacentHTML("afterbegin", mobMarkup(result))
//         console.log(refsEl.viewportWidth);

//     } else if (refsEl.viewportWidth >= 768) {
//         refsEl.categoryWrap.innerHTML = tabMarkup(result);
//         console.log(refsEl.viewportWidth);

//     } else { console.log(refsEl.viewportWidth); }
//     return mobMarkup(result)
// })
// function mobMarkup(arr) {
//     const arrSections = arr.map(section =>
//         `<li class="rest__item item">${section.display_name}</li>`
//     ).join("");
//     return `<div class="rest__wrapper"><ul class="rest__list list">${arrSections}</ul></div >`
// }
// function tabMarkup(arr) {

//     let categoryItem = '';
//     let restItem = '';
//     for (let i = 0; i < 4; i++) {
//         categoryItem += ` <li class="category__item">
//                         <button class="category__btn btn">${arr[i].display_name}</button>
//                     </li>`
//     }
//     for (let i = 4; i < arr.length; i++) {
//         restItem += ` <li class="rest__item item">${arr[i].display_name}</li>`
//     }
//     let data = `<ul class="category__list">${categoryItem}</ul><div class="category__wrapper--mob">
//                     <button class="category__btn btn js-open-list list-toggle list-toggle--open" aria-expanded="false"
//                         aria-controls="list-menu">
//                         Others
//                         <svg class="icon category__icon--up" width="14" height="14">
//                             <use href="../images/icon-sprites.svg#Frame-11"></use>
//                         </svg>
//                         <svg class="icon category__icon--down" width="14" height="14">
//                             <use href="../images/icon-sprites.svg#Frame-12"></use>
//                         </svg>
//                     </button>
//                     <div class="list-container js-list-container" id="category-rest">
//                         <!-- <div class="rest__wrapper">
//                             <ul class="rest__list list">
//                                 ${restItem}
//                             </ul>
//                         </div> -->
//                     </div>
//                 </div>`;
//     return data;
//     console.log(data);
//     // const arrSectionsBtn = arr.map(section =>
//     //     `<li class="rest__item item">${section.display_name}</li>`
//     //         ` <li class="category__item">
//     //                     <button class="category__btn btn">${section.display_name}</button>
//     //                 </li>`
//     // ).join("");
//     // return `<ul class="category__list">
//     //               ${arrSectionsBtn}
//     //             </ul>
//     //             <div class="category__wrapper--mob">
//     //                 <button class="category__btn btn js-open-list list-toggle list-toggle--open" aria-expanded="false"
//     //                     aria-controls="list-menu">
//     //                     Others
//     //                     <svg class="icon category__icon--up" width="14" height="14">
//     //                         <use href="../images/icon-sprites.svg#Frame-11"></use>
//     //                     </svg>
//     //                     <svg class="icon category__icon--down" width="14" height="14">
//     //                         <use href="../images/icon-sprites.svg#Frame-12"></use>
//     //                     </svg>
//     //                 </button>
//     //                 <div class="list-container js-list-container" id="category-rest">
//     //                     <!-- <div class="rest__wrapper">
//     //                         <ul class="rest__list list">
//     //                             <li class="rest__item item">Admin</li>
//     //                         </ul>
//     //                     </div> -->
//     //                 </div>
//     //             </div>`
// }



import { refsEl } from "./refs";

