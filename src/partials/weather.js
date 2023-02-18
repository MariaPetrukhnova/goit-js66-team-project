const weather__temperature = document.querySelector('.weather__temperature');
const weather__city = document.querySelector('.weather__city');
const weather__type = document.querySelector('.weather__type');
const weather__imgvalue = document.querySelector('.weather__imgvalue');
const weather__dayofweek = document.querySelector('.weather__dayofweek');
const weather__dateofweek = document.querySelector('.weather__dateofweek');
const weather__group = document.querySelector('.weather__group');
const weather__img = document.querySelector('.weather__img');
const weather__symbol = document.querySelector('.weather__symbol');
const weather__splitter = document.querySelector('.weather__splitter');
const weather__typegroup = document.querySelector('.weather__typegroup');
const weather__date = document.querySelector('.weather__date');

document.addEventListener('DOMContentLoaded', loadWeatherDate);

function loadWeatherDate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSucces, OnError);
  } else {
    alert('Your browser does not support geolocation');
  }
}

function onSucces(position) {
  const { latitude, longitude } = position.coords;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=419bd34d8daba21c0a4890e35d027d3f`;
  const dateWeather = getDateOfWeather(API_URL);
  dateWeather.then(date => {
    if (date !== undefined) {
      processingDate(date);
    }
  });
}

function processingDate(date) {
  const { name, dt } = date;
  const { temp } = date.main;
  const { main, icon } = date.weather[0];

  weather__temperature.textContent = Math.floor(temp);
  weather__city.textContent = name;
  weather__type.textContent = main;

  weather__imgvalue.src = `https://openweathermap.org/img/wn/${icon}.png`;

  const newDate = new Date();
  const { dayOfWeek, dateOfWeek, monthOfWeek } = partsOfDate(
    newDate.toUTCString()
  );
  weather__dayofweek.textContent = dayOfWeek;
  weather__dateofweek.textContent =
    dateOfWeek + ' ' + monthOfWeek + ' ' + newDate.getFullYear();
}

function getDateOfWeather(API_URL) {
  const fetchDate = fetch(API_URL);
  return fetchDate.then(response => {
    if (response.ok) {
      return response.json();
    } else {
      weather__img.style.opacity = '0';
      weather__date.style.opacity = '0';
      weather__splitter.style.opacity = '0';
      weather__temperature.textContent = 'no-';
      weather__symbol.textContent = 'data';
      weather__typegroup.style.opacity = '0';
    }
  });
}

function partsOfDate(strDate) {
  const indexSymOne = strDate.indexOf(',');
  const dayOfWeek = strDate.substr(0, indexSymOne).trim();
  const newStrofDay = strDate.substr(indexSymOne + 1).trim();
  const indexSymTwo = newStrofDay.indexOf(' ');
  const dateOfWeek = newStrofDay.substr(0, indexSymTwo).trim();
  const newStrofMonth = newStrofDay.substr(indexSymTwo + 1).trim();
  const indexSymThree = newStrofMonth.indexOf(' ');
  const monthOfWeek = newStrofMonth.substr(0, indexSymThree).trim();
  return { dayOfWeek, monthOfWeek, dateOfWeek };
}

function OnError() {
  const API_URL =
    'https://api.openweathermap.org/data/2.5/weather?q=lONDON&lang=en&units=metric&appid=419bd34d8daba21c0a4890e35d027d3f';
  const dateWeather = getDateOfWeather(API_URL);
  dateWeather.then(date => {
    if (date !== undefined) {
      processingDate(date);
    }
  });
}

function createMarkupWeather() {
  const textMarkup =
    '<section class="weather">' +
    '<div class="weather__group">' +
    '<div class="weather__temperaturedate">' +
    '<span class="weather__temperature">' +
    '</span>' +
    '<span class="weather__symbol" >&#176;</span>' +
    '</div ><div class="weather__splitter">' +
    '</div > <div class="weather__typegroup">' +
    '<span class="weather__type"></span>' +
    '<div class="weather__citygroup">' +
    '<svg class="weather__svg">' +
    '<use href="../img/icon-sprites.svg#location"></use>' +
    '</svg > <p class="weather__city"></p>' +
    '</div ></div ></div ><div class="weather__img">' +
    '<img class="weather__imgvalue" src="" alt="">' +
    '</div ><div class="weather__date">' +
    '<span class="weather__dayofweek"></span>' +
    '<span class="weather__dateofweek"></span></div>' +
    '<div class="weather__refgroup"><a class="weather__ref" href="https://sinoptik.ua/" rel="noopener noreferrer" target="_blank">' +
    'weather for week</a ></div ></section > ';

  return textMarkup;
}

export * as weather from './weather.js';
