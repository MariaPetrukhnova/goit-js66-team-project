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
  console.log(latitude, longitude);
}

function OnError() {}

export * as weather from './weather.js';
