
import CalendarDates from "calendar-dates";
const calendarDates = new CalendarDates();



const calendarWrapper = document.querySelector('.js-open-calendar');
const calendarInput = document.querySelector('.calendar__input');
const calendarBody = document.querySelector('.js-calendar-container');
const nextMonthBtn = document.querySelector(".calendar__month-btn--next");
const prevMonthBtn = document.querySelector(".calendar__month-btn--prev");
const nextYearBtn = document.querySelector(".calendar__year-btn");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

nextYearBtn.addEventListener("click",  handleYearBtnClick);
nextMonthBtn.addEventListener("click",  handleBtnClick);
prevMonthBtn.addEventListener("click",  handlePrevBtnClick);
calendarWrapper.addEventListener("click", toggleCalendar);



function toggleCalendar() {
  const isMenuOpen = calendarInput.getAttribute('aria-expanded') === 'true' || false;
  calendarWrapper.setAttribute('aria-expanded', !isMenuOpen);
  calendarWrapper.classList.toggle('reversed');
  calendarBody.classList.toggle('is-open');

}


const main = async () => {
  const datesArr = await calendarDates.getMatrix(new Date());
  console.log("🚀 ~ file: calendar.js:17 ~ main ~ datesArr", datesArr)

  const today = new Date();
  const todayArr = [months[today.getMonth()], today.getFullYear()];
  const croppedArr = changeFormatData(datesArr);
  renderCalendar(croppedArr);
  renderMonth(todayArr);
  
};

async function handleBtnClick() {
  const monthText = document.querySelector(".calendar__month").textContent;
  const date = monthText.split(" ");
  
  let index = findIndexNextMonth(date);
  const datesArr = await calendarDates.getMatrix(new Date(`${date[1]}, ${months[index]}`));
  const croppedArr = changeFormatData(datesArr);
  console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr", croppedArr)
  renderCalendar(croppedArr);
  renderMonth([months[index], date[1]]);
}

async function handlePrevBtnClick() {
  const monthText = document.querySelector(".calendar__month").textContent;
  const date = monthText.split(" ");
  let index =  findIndexPrevMonth(date);
  const datesArr = await calendarDates.getMatrix(new Date(`${date[1]}, ${months[index]}`));
  const croppedArr = changeFormatData(datesArr);
  console.log("🚀 ~ file: calendar.js:28 ~ main ~ croppedArr", croppedArr)
  renderCalendar(croppedArr);
  renderMonth([months[index], date[1]]);
}

function findIndexPrevMonth(date) {
  let index = months.indexOf(date[0]);
  console.log("date:", date);
  console.log("index:", index);

  if(index === 0) {
    index = 11;
    date[1] = +date[1] - 1;
    console.log("date:", date);
  } else {
    index -= 1;
  }
  return index;

}

function findIndexNextMonth(date) {
  let index = months.indexOf(date[0]);
  console.log("date:", date);
  if(index === 11) {
    index = 0;
    date[1] = +date[1] + 1;
    console.log("date:", date);
  } else {
    index += 1;
  }
  return index;

}



async function handleYearBtnClick() {
  const monthText = document.querySelector(".calendar__month").textContent;
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
  const calendTextDiv = document.querySelector('.calendar__body-caption');
  const p = calendTextDiv.querySelector("p");
  if (p) {
    p.remove();
  }
  calendTextDiv.insertAdjacentHTML("afterbegin", `<p class="calendar__month">${month} ${year}</p>`);
 

}

function renderCalendar(croppedArr) {
  const calendarDatesContainer = document.querySelector('.calendar__list');
  const today = new Date().getDate();
  calendarDatesContainer.innerHTML = `${croppedArr.map(date=> {
    if(today === date.date) {
      return `<li id="${date.iso}" class="calendar__date calendar__date--active">${date.date}</li>`
    } 
    return `<li id="${date.iso}" class="calendar__date">${date.date}</li>`;
  }).join("")}`
}



function changeFormatData(date) {
  const cropped = date.flat();
  console.log("cropped", cropped);
  // отримали масив днів і його обрізаємо
  return [...cropped].slice(1, 36);

}


calendarBody.addEventListener('click', onDateSelect);
// Коли користувач натиснув на дату,функція робить дату активною. Якщо на ту саму дату, то знімає активний клас (додати до кожн фкції комент)
function onDateSelect(evt) {
  const isDateEl = evt.target.classList.contains('calendar__date');

  if (!isDateEl) {
    return;
  }

  const dateEl = evt.target;
  const currentDate = document.querySelector('.calendar__date--active');

  const selectedDate = new Date(evt.target.id);
  console.log("selectedDate", selectedDate)
  console.log("todayDate", new Date()) 
    

  if (currentDate === dateEl){
    calendarInput.value = "";
    currentDate.classList.remove('calendar__date--active');
  } else {
    removeActiveDateClass();
    addActiveDateClass(dateEl);

  }
  

  // calendarBody.classlist.add(hidden);

}

function removeActiveDateClass() {
  const currentActiveDate = document.querySelector('.calendar__date.calendar__date--active');
  console.log("🚀 ~ file: calendar.js:181 ~ removeActiveDateClass ~ currentActiveDate", currentActiveDate)

  if (currentActiveDate) {
    currentActiveDate.classList.remove('calendar__date--active');
  }
}


function getDateForInput (elem) {
  const inputValue = elem.id.split("-").reverse().join("/");
  calendarInput.value = inputValue;
  // Виклик тут фкції для пошуку новин за датою
  // Або кнопка, де знайдуть інпут на тот момент, коли на спан з датою натиснули і інпут заповнений
  return inputValue;
}


function addActiveDateClass(elem) {
  elem.classList.add('calendar__date--active');
  getDateForInput (elem);
  toggleCalendar();
}


export * as calendarTools from './calendar.js';