import CalendarDates from 'calendar-dates';
const calendarDates = new CalendarDates();

import {
  arrHandler,
  notFoundHandler,
  fetchNewsBySearch,
} from './apiFetchNewsByValue.js';

import NewsApi from './apiConstructor.js';

// import {fetchNewsByDate} from "./api-archive-by-month.js";

const newsApi = new NewsApi();
const pageNotFound = document.querySelector(`.not-found`);
let queryValue = '';

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
  console.log('🚀 ~ file: calendar.js:17 ~ main ~ datesArr', datesArr);

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
  console.log('🚀 ~ file: calendar.js:28 ~ main ~ croppedArr', croppedArr);
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
  console.log('🚀 ~ file: calendar.js:28 ~ main ~ croppedArr', croppedArr);
  renderCalendar(croppedArr);
  renderMonth([months[index], date[1]]);
}

function findIndexPrevMonth(date) {
  let index = months.indexOf(date[0]);
  console.log('date:', date);
  console.log('index:', index);

  if (index === 0) {
    index = 11;
    date[1] = +date[1] - 1;
    console.log('date:', date);
  } else {
    index -= 1;
  }
  return index;
}

function findIndexNextMonth(date) {
  let index = months.indexOf(date[0]);
  console.log('date:', date);
  if (index === 11) {
    index = 0;
    date[1] = +date[1] + 1;
    console.log('date:', date);
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
  console.log('🚀 ~ file: calendar.js:28 ~ main ~ croppedArr', croppedArr);
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
  console.log('cropped', cropped);
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
  console.log('selectedDate', selectedDate);
  console.log('todayDate', new Date());

  const inputValue = dateEl.id.split('-').reverse().join('/');
  const realDate = dateEl.id.split('-').join('');
  console.log(realDate);
  const searchInput = document.querySelector(
    '.page-header__search-input'
  ).value;

  if (currentDate === dateEl) {
    calendarInput.value = '';
    currentDate.classList.remove('calendar__date--active');
  } else if (currentDate !== dateEl && selectedDate > new Date()) {
    console.log('selectedDate > new Date()', selectedDate > new Date());
    // renderNotFound();
    // removeActiveDateClass();
    // addActiveDateClass(dateEl);
    return;
  } else {
    // const searchInput = document.querySelector(".page-header__search-input");
    // if (!searchInput.value) {

    //   console.log("Виклик fetchNewsBySearch(query) без даних по search input тільки з датою");
    // }
    // if (searchInput.value) {
    //   fetchNewsBySearchAndData(queryValue);
    //   console.log("Виклик fetchNewsBySearch(query) з даними з search input і по даті");
    // }

    removeActiveDateClass();
    addActiveDateClass(dateEl);

    fetchNewsBySearchAndData(searchInput, realDate, pageNum);
    pg.addEventListener('click', e => {
      const ele = e.target;

      if (ele.dataset.page) {
        const pageNumber = parseInt(e.target.dataset.page, 10);

        fetchNewsBySearchAndData(searchInput, realDate, pageNumber - 1);
        console.log('Виклик fetchNewsBySearch(query) з даними по даті ');
      }
    });

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

const fetchNewsBySearchAndData = async (request, realDate) => {
  try {
    const response = await fetch(
      `${newsApi.SEARCH_ENDPOINT_URL}q=${request}&begin_date=${realDate}&end_date=${realDate}&${newsApi.API_KEY}`
    );
    if (response.ok === false) {
      throw new Error('Such a request has not been found');
    }
    const articles = await response.json();
    const resArr = articles.response.docs;
    console.log(resArr.length, '222');

    if (resArr.length) {
      pageNotFound.classList.add(`is-hidden`);
      deletePagination.classList.remove(`is-hidden`);
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
