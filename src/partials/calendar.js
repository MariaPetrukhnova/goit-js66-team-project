
import CalendarDates from "calendar-dates";
import { SplitVendorChunkCache } from "vite";
const calendarDates = new CalendarDates();

const calendarInput = document.querySelector('.calendar__input');
const calendarBody = document.querySelector('.calendar__body');
// const calendarDate = document.querySelector('.calendar__date');
const  nextMonthBtn = document.querySelector("#calend-btn");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

nextMonthBtn.addEventListener("click", handleBtnClick);




async function handleBtnClick() {
  const monthText = document.querySelector(".calend-month").textContent;
  const date = monthText.split(" ");
  
  let index = months.indexOf(date[0]);
  console.log("date:", date);
  if(index === 11) {
    index = 0;
    date[1] = +date[1] + 1;
    console.log("date:", date);
  } else {
    index += 1;
  }

  const datesArr = await calendarDates.getMatrix(new Date(`${date[1]}, ${months[index]}`));
  const croppedArr = changeFormatData(datesArr);
  console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr", croppedArr)
  renderCalendar(croppedArr);
  renderMonth([months[index], date[1]]);
}


const main = async () => {
  const datesArr = await calendarDates.getMatrix(new Date());
  console.log("🚀 ~ file: calendar.js:17 ~ main ~ datesArr", datesArr)

  const today = new Date();
  const todayArr = [months[today.getMonth()], today.getFullYear()];
  // спитати
  // console.log(months)
  // console.log("todayArr:", todayArr);
  // console.log(today.getFullYear();
  const croppedArr = changeFormatData(datesArr);
  getDateForInput(datesArr);
  
  console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr", croppedArr)
  renderCalendar(croppedArr);
  renderMonth(todayArr);

  // calendarDatesContainer.insertAdjacentHTML("beforeend", `${croppedArr.map(date=> {
  //   if(today === date.date) {
  //     return `<li class="calendar__date active">${date.date}</li>`
  //   } 
  //   return `<li class="calendar__date">${date.date}</li>`;
  // }).join("")}`)

  // const croppedDates = await [...datesArr].splice(0, 5).flat();
  // const arrayEnd = {...croppedDates[croppedDates.length-1]};
  // const cropped = [...croppedDates].slice(1);
  // const today = new Date().getDate();
  // arrayEnd.date = arrayEnd.date + 1;
  // const croppedDatesArr = [...cropped, arrayEnd];
  // console.log(arrayEnd);
  // console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedDatesArr", croppedDatesArr)
  
  // calendarDatesContainer.insertAdjacentHTML("beforeend", `${croppedDatesArr.map(date=> {
  //   if(today === date.date) {
  //     return `<li class="calendar__date active">${date.date}</li>`
  //   } 

  //   return `<li class="calendar__date">${date.date}</li>`;
  // }).join("")}`)

  // по натиск кнопки на наст місяць:
  // const nextMonthDate = new Date(`Jan 1, ${new Date().getMonth() + 1}`);

  // for (const meta of await calendarDates.getDates(new Date())) {
  //   console.log("meta", meta);
  // console.log(meta.date);
  // }

  // for (const meta of await calendarDates.getMatrix(new Date())) {
  // console.log("meta", meta);
  // console.log("meta[0].date:", meta[0].date);
  // }
};


async function handleYearBtnClick() {
  const monthText = document.querySelector(".calend-month").textContent;
  const date = monthText.split(" ");
  date[1] = +date[1] + 1;
  let index = months.indexOf(date[0]);
  const datesArr = await calendarDates.getMatrix(new Date(`${date[1]}, ${months[index]}`));
  const croppedArr = changeFormatData(datesArr);
  console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr", croppedArr)
  renderCalendar(croppedArr);
  renderMonth([months[index], date[1]]);
}


function renderMonth([month, year]) {
  const calendTextDiv = document.querySelector('.calendar__body');
  const p = calendTextDiv.querySelector("p");
  if (p) {
    p.remove();
  }
  calendTextDiv.insertAdjacentHTML("afterbegin", `<p class="calend-month">${month} ${year}</p>`);
 

}

function renderCalendar(croppedArr) {
  const calendarDatesContainer = document.querySelector('.calendar__list');
  const today = new Date().getDate();
  calendarDatesContainer.innerHTML = `${croppedArr.map(date=> {
    if(today === date.date) {
      return `<li class="calendar__date active">${date.date}</li>`
    } 
    return `<li class="calendar__date">${date.date}</li>`;
  }).join("")}`
}

 

// если месяц не помещается в 4 недели, выводить 5?

function changeFormatData(date) {
  const cropped = date.flat();
  console.log("cropped", cropped);
  return [...cropped].slice(1, 36);

}

// function getDateForInput(data) {
//   const dateForInput = changeFormatData(data);
//   console.log(dateForInput);
  
// }



main();





// async function getNextMonth() {
//   const datesArr = await calendarDates.getMatrix(new Date(`${new Date().getMonth() + 1}`));
//   const cropped = await datesArr.flat();
//   const croppedArr = [...cropped].slice(1, 36);
//   const today = new Date().getDate();
//   console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr", croppedArr)
//   calendarDatesContainer.insertAdjacentHTML("beforeend", `${croppedArr.map(date=> {
//     if(today === date.date) {
//       return `<li class="calendar__date active">${date.date}</li>`
//     } 
//     return `<li class="calendar__date">${date.date}</li>`;
//   }).join("")}`)
// }


// const main = async () => {
//   for (const meta of await calendarDates.getDates(new Date())) {
//     console.log(meta);
//      
//   }

//   console.log(calendarDates.getMatrix(new Date()));
//   // масив масивів

//   const dataArr = await calendarDates.getMatrix(new Date());
  // const weekArr = dataArr[0];
  // console.log("🚀 ~ file: calendar.js:18 ~ main ~ weekArr", weekArr)

  // const weeksArr = dataArr.map((el) => {
  //   console.log("Element in map:", typeof el);
  //   // console.log(el.date);
  //   // console.log(el.iso);
  
  // })


  // const main = async () => {
  //   for (const meta of await calendarDates.getDates(new Date())) {
  //     // console.log(meta);
  //     // console.log(meta.date); 
  //     const liEl = renderCalendarMarkupLi(meta);
  //     const joined = liEl.join("");
  //     return calendarDatesContainer.innerHtml(joined);
 
      
  //   }
  // }

//  async function main() {
//   const dates = await calendarDates.getDates(new Date());
//   const data = dates.map(meta => {
//     // console.log(meta);
//     // console.log(meta.date); 

//   })
//  }  
  

//   for (const meta of await calendarDates.getMatrix(new Date())) {
//     // console.log(meta);
//     // console.log("meta[0].date:", meta[0].date);
// // мета в переборі - це тиждень

//   }
// };




// main();






// calendarBody.addEventListener('click', onDateSelect);

// function onDateSelect(evt) {
//   console.log(evt.target.className);
//   if (evt.target.className !== 'calendar__date') {
//     return;

//   }
//   evt.target.classList.toggle("checked");
//   calendarInput.value = evt.target.textContent;
//   // calendarBody.classlist.add(hidden);


// }
  



// зробити так, щоб завантажувалась розмітка і у текстконтент приходили дані з апі

// function renderCalendarMarkupLi({date}) {
//   return` <li class="calendar__date">${date}</li>`

// }

// function renderCalendarMarkup() {

// }
// function handleCalendarLib() {

// }




export * as calendarTools from './calendar.js';