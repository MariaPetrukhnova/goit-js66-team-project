import CalendarDates from 'calendar-dates';
const calendarDates = new CalendarDates();
import { arrHandler, notFoundHandler } from './apiFetchNewsByValue.js';
import NewsApi from './apiConstructor.js';

// import {fetchNewsByDate} from "./api-archive-by-month.js";

const newsApi = new NewsApi();
const pageNotFound = document.querySelector(`.not-found`);

const deletePagination = document.querySelector('.page-container');

const calendarWrapper = document.querySelector('.js-open-calendar');
const calendarInput = document.querySelector('.calendar__input');
const calendarBody = document.querySelector('.js-calendar-container');
const nextMonthBtn = document.querySelector('.calendar__month-btn--next');
const prevMonthBtn = document.querySelector('.calendar__month-btn--prev');
const nextYearBtn = document.querySelector('.calendar__year-btn');
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

nextYearBtn.addEventListener('click', handleYearBtnClick);
nextMonthBtn.addEventListener('click', handleBtnClick);
prevMonthBtn.addEventListener('click', handlePrevBtnClick);
calendarWrapper.addEventListener('click', toggleCalendar);

function toggleCalendar() {
  const isMenuOpen =
    calendarInput.getAttribute('aria-expanded') === 'true' || false;
  calendarWrapper.setAttribute('aria-expanded', !isMenuOpen);
  calendarWrapper.classList.toggle('reversed');
  calendarBody.classList.toggle('is-open');
}

const main = async () => {
  const datesArr = await calendarDates.getMatrix(new Date());

  const today = new Date();
  const todayArr = [months[today.getMonth()], today.getFullYear()];
  const croppedArr = changeFormatData(datesArr);
  renderCalendar(croppedArr);
  renderMonth(todayArr);
};

async function handleBtnClick() {
  const monthText = document.querySelector('.calendar__month').textContent;
  const date = monthText.split(' ');

  let index = findIndexNextMonth(date);
  const datesArr = await calendarDates.getMatrix(
    new Date(`${date[1]}, ${months[index]}`)
  );
  const croppedArr = changeFormatData(datesArr);
  renderCalendar(croppedArr);
  renderMonth([months[index], date[1]]);
}

async function handlePrevBtnClick() {
  const monthText = document.querySelector('.calendar__month').textContent;
  const date = monthText.split(' ');
  let index = findIndexPrevMonth(date);
  const datesArr = await calendarDates.getMatrix(
    new Date(`${date[1]}, ${months[index]}`)
  );
  const croppedArr = changeFormatData(datesArr);
  renderCalendar(croppedArr);
  renderMonth([months[index], date[1]]);
}

function findIndexPrevMonth(date) {
  let index = months.indexOf(date[0]);

  if (index === 0) {
    index = 11;
    date[1] = +date[1] - 1;
  } else {
    index -= 1;
  }
  return index;
}

function findIndexNextMonth(date) {
  let index = months.indexOf(date[0]);
  if (index === 11) {
    index = 0;
    date[1] = +date[1] + 1;
  } else {
    index += 1;
  }
  return index;
}

async function handleYearBtnClick() {
  const monthText = document.querySelector('.calendar__month').textContent;
  const date = monthText.split(' ');
  date[1] = +date[1] + 1;
  let index = months.indexOf(date[0]);
  const datesArr = await calendarDates.getMatrix(
    new Date(`${date[1]}, ${months[index]}`)
  );
  const croppedArr = changeFormatData(datesArr);
  renderCalendar(croppedArr);
  renderMonth([months[index], date[1]]);
}

function renderMonth([month, year]) {
  const calendTextDiv = document.querySelector('.calendar__body-caption');
  const p = calendTextDiv.querySelector('p');
  if (p) {
    p.remove();
  }
  calendTextDiv.insertAdjacentHTML(
    'afterbegin',
    `<p class="calendar__month">${month} ${year}</p>`
  );
}

function renderCalendar(croppedArr) {
  const calendarDatesContainer = document.querySelector('.calendar__list');
  const todayFullDate = new Date();
  const today = todayFullDate.getDate();

  calendarDatesContainer.innerHTML = `${croppedArr
    .map(date => {
      const dayOfWeek = new Date(date.iso).getDay();
      if (today === date.date) {
        return `<li id="${date.iso}" class="calendar__date calendar__date--active">${date.date}</li>`;
      }
      if (+todayFullDate < new Date(date.iso)) {
        return `<li id="${date.iso}" class="calendar__date calendar__date--inactive">${date.date}</li>`;
      }
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        return `<li id="${date.iso}" class="calendar__date calendar__date--weekend">${date.date}</li>`;
      }

      return `<li id="${date.iso}" class="calendar__date">${date.date}</li>`;
    })
    .join('')}`;
}

function renderNotFound() {
  const newsContainer = document.querySelector('.news-gallery');

  return (newsContainer.innerHTML = `<div class="container ">
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
</div>`);
}

function changeFormatData(date) {
  const cropped = date.flat();
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

  const inputValue = dateEl.id.split('-').reverse().join('/');
  const realDate = dateEl.id.split('-').join('');
  const searchInput = document.querySelector(
    '.page-header__search-input'
  ).value;

  if (currentDate === dateEl) {
    calendarInput.value = '';
    currentDate.classList.remove('calendar__date--active');
  } else if (currentDate !== dateEl && selectedDate > new Date()) {
    // renderNotFound();
    // removeActiveDateClass();
    // addActiveDateClass(dateEl);
    return;
  } else {
    // const searchInput = document.querySelector(".page-header__search-input");
    // if (!searchInput.value) {

    // }
    // if (searchInput.value) {
    //   fetchNewsBySearchAndData(queryValue);
    // }

    removeActiveDateClass();
    addActiveDateClass(dateEl);
    fetchNewsBySearchAndData(searchInput, realDate);
    // получить запрос со строки и с инпута при каждом выpове
  }
}

function removeActiveDateClass() {
  const currentActiveDate = document.querySelector(
    '.calendar__date.calendar__date--active'
  );

  if (currentActiveDate) {
    currentActiveDate.classList.remove('calendar__date--active');
  }
}

let realDate = 0;
function getDateForInput(elem) {
  const inputValue = elem.id.split('-').reverse().join('/');
  calendarInput.value = inputValue;
  realDate = elem.id.split('-').join('');
  return inputValue, realDate;
  // повторити це в функції де виклик
}

// функція отримує дані про дату та ключове слово, а також просто п ключовому слову 

const fetchNewsBySearchAndData = async (request="", realDate="", pageNum=0) => {
  try {
    // console.log(request, realDate, pageNum);
    // let pageNum = newsApi.pageNumber;
    const response = await fetch(
      `${newsApi.SEARCH_ENDPOINT_URL}q=${request}&begin_date=${realDate}&page=${pageNum}&end_date=${realDate}&${newsApi.API_KEY}`
    );
    if (response.ok === false) {
      throw new Error('Such a request has not been found');
    }
    const articles = await response.json();
    const resArr = articles.response.docs;
    // перевіряємо, чи отримали дані

    if (resArr.length) {
      pageNotFound.classList.add(`is-hidden`);
      deletePagination.classList.remove(`is-hidden`);
      // приводимо до єдиного вигляду
      arrHandler(resArr);
      if (resArr.length < 9) {
        deletePagination.classList.add(`is-hidden`);
      }
    } else if (resArr.length === 0) {
      notFoundHandler();
      deletePagination.classList.add(`is-hidden`);
    }

    // arrHandler(resArr);
  } catch (error) {
    console.log(error);
  }
};

function addActiveDateClass(elem) {
  elem.classList.add('calendar__date--active');
  getDateForInput(elem);
  toggleCalendar();
}

main();
export { fetchNewsBySearchAndData };
export * as calendarTools from './calendar.js';
