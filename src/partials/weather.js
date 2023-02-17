let API_URL = '';

const weather__temperature = document.querySelector('.weather__temperature');
const weather__city = document.querySelector('.weather__city');
const weather__type = document.querySelector('.weather__type');
const weather__imgvalue = document.querySelector('.weather__imgvalue');
const weather__dayofweek = document.querySelector('.weather__dayofweek');
const weather__dateofweek = document.querySelector('.weather__dateofweek');

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
  API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=419bd34d8daba21c0a4890e35d027d3f`;
  console.log(API_URL);
  const dateWeather = getDateOfWeather();
  dateWeather.then(date => {
    processingDate(date);
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

function getDateOfWeather() {
  const fetchDate = fetch(API_URL);
  return fetchDate.then(response => {
    if (response.ok) {
      return response.json();
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

function partOfDay() {}

function OnError() {
  console.log('Ошибка');
}

export * as weather from './weather.js';
