import spriteUrl from '/images/icon-sprites.svg';

const mainSection = document.querySelector('main');
const API_KEY = '419bd34d8daba21c0a4890e35d027d3f';

document.addEventListener('DOMContentLoaded', loadWeatherDate);

function getMainDate(apiURL) {
  const dateWeather = getDateOfWeather(apiURL);
  dateWeather.then(date => {
    if (date !== undefined) {
      processingDate(date);
    }
  });
}

function loadWeatherDate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSucces, OnError);
  } else {
    alert('Your browser does not support geolocation');
  }
}

function onSucces(position) {
  const { latitude, longitude } = position.coords;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
  getMainDate(API_URL);
}

function processingDate(date) {
  const { name } = date;
  const { temp } = date.main;
  const { main, icon } = date.weather[0];
  const currentDate = new Date();
  const { dayOfWeek, dateOfWeek, monthOfWeek } = partsOfDate(
    currentDate.toUTCString()
  );
  const dateOfWeak = getStrDateOfWeak(dateOfWeek, monthOfWeek, currentDate);

  const dateOfWeather = {
    temp: Math.floor(temp),
    typeWeather: main,
    city: name,
    srcIcon: getSrcIcon(icon),
    dayOfWeak: dayOfWeek,
    dateOfWeak: dateOfWeak,
    imgOpacity: '',
    dateOpacity: '',
    splitterOpacity: '',
    typegroupOpacity: '',
    textSymbol: '&#176;',
  };

  renderMarkup(dateOfWeather);
}

function getStrDateOfWeak(dayOfWeek, monthOfWeek, currentDate) {
  return dayOfWeek + ' ' + monthOfWeek + ' ' + currentDate.getFullYear();
}

function getSrcIcon(icon) {
  return `https://openweathermap.org/img/wn/${icon}.png`;
}

function getDateOfWeather(API_URL) {
  const fetchDate = fetch(API_URL);
  return fetchDate.then(response => {
    if (response.ok) {
      return response.json();
    } else {
      const dateOfWeather = {
        temp: 'no-',
        typeWeather: '',
        city: '',
        srcIcon: '',
        dayOfWeak: '',
        dateOfWeak: '',
        imgOpacity: ' opacityElement',
        dateOpacity: ' opacityElement',
        splitterOpacity: ' opacityElement',
        typegroupOpacity: ' opacityElement',
        textSymbol: 'data',
      };

      renderMarkup(dateOfWeather);
    }
  });
}

function renderMarkup(dateOfWeather) {
  const markup = createMarkupWeather(dateOfWeather);
  const promise = new Promise((resolve, rejected) => {
    const newEL = document.querySelectorAll('.article');
    resolve(newEL);
  });
  promise
    .then(response => {
      response.forEach((el, index) => {
        if (index === 1) {
          el.insertAdjacentHTML('afterend', markup);
        }
      });
    })
    .catch(error => console.error(error));
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
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=lONDON&lang=en&units=metric&appid=${API_KEY}`;
  getMainDate(API_URL);
}

function createMarkupWeather(dateOfMarkup) {
  const {
    temp,
    typeWeather,
    city,
    srcIcon,
    dayOfWeak,
    dateOfWeak,
    imgOpacity,
    dateOpacity,
    splitterOpacity,
    typegroupOpacity,
    textSymbol,
  } = dateOfMarkup;

  const textMarkup =
    '<li class="weather">' +
    '<div class="weather__group">' +
    '<div class="weather__temperaturedate">' +
    '<span class="weather__temperature">' +
    String(temp) +
    '</span>' +
    '<span class="weather__symbol" >' +
    textSymbol +
    '</span>' +
    '</div ><div class="weather__splitter' +
    splitterOpacity +
    '">' +
    '</div > <div class="weather__typegroup' +
    typegroupOpacity +
    '">' +
    '<span class="weather__type">' +
    String(typeWeather) +
    '</span > ' +
    '<div class="weather__citygroup">' +
    '<svg class="weather__svg">' +
    `<use href="${spriteUrl}#location"></use>` +
    '</svg > <p class="weather__city">' +
    String(city) +
    '</p > ' +
    '</div ></div ></div ><div class="weather__img' +
    imgOpacity +
    '">' +
    '<img class="weather__imgvalue" src="' +
    String(srcIcon) +
    '" alt="">' +
    '</div ><div class="weather__date' +
    dateOpacity +
    '">' +
    '<span class="weather__dayofweek">' +
    String(dayOfWeak) +
    '</span > ' +
    '<span class="weather__dateofweek">' +
    String(dateOfWeak) +
    '</span></div>' +
    '<div class="weather__refgroup"><a class="weather__ref" href="https://sinoptik.ua/" rel="noopener noreferrer" target="_blank">' +
    'weather for week</a ></div ></li > ';

  return textMarkup;
}

export { loadWeatherDate };
