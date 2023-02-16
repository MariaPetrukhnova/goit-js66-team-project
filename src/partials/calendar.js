
import CalendarDates from "calendar-dates";
const calendarDates = new CalendarDates();

const calendarInput = document.querySelector('.calendar__input');
const calendarBody = document.querySelector('.calendar__body');
const  nextMonthBtn = document.querySelector("#calend-btn");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

nextMonthBtn.addEventListener("click",  handleBtnClick);


const main = async () => {
  const datesArr = await calendarDates.getMatrix(new Date());
  console.log("🚀 ~ file: calendar.js:17 ~ main ~ datesArr", datesArr)

  const today = new Date();
  const todayArr = [months[today.getMonth()], today.getFullYear()];
  const croppedArr = changeFormatData(datesArr);
  getDateForInput(datesArr);
  
  console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr", croppedArr)
  renderCalendar(croppedArr);
  renderMonth(todayArr);
  
};


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



function changeFormatData(date) {
  const cropped = date.flat();
  console.log("cropped", cropped);
  return [...cropped].slice(1, 36);

}




function getDateForInput(data) {
  const dateForInput = changeFormatData(data);
  console.log(dateForInput);

}

calendarBody.addEventListener('click', onDateSelect);

function onDateSelect(evt) {
  console.log(evt.target.className);
  if (evt.target.className !== 'calendar__date') {
    return;

  }
  evt.target.classList.toggle("checked");
  // calendarBody.classlist.add(hidden);


}


main();






export * as calendarTools from './calendar.js';