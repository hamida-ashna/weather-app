let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[currentTime.getDay()];
let hours = currentTime.getHours();
let min = currentTime.getMinutes();

let date = document.querySelector("#date");
date.innerHTML = `${currentDay} ${hours}:${min}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchTxt");

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    alert("Please enter a city");
  }

  let apiKey = "3499ef150985eccadd080ff408a018df";
  let units = "metric";
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#temperature");
  showTemp.innerHTML = `${temp}°`;

  let desc = document.querySelector("#desc");
  desc.innerHTML = response.data.weather[0].description;

  let Humidity = document.querySelector("#Humidity");
  Humidity.innerHTML = "Humidity: " + response.data.main.humidity;

  let w = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#Wind");
  wind.innerHTML = "Wind: " + w + " km/h";
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Challenge 2
function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp) + "°";

  document.querySelector("#Humidity").innerHTML =
    "Humidity: " + response.data.main.humidity;
  document.querySelector("#Wind").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed);
  document.querySelector("#desc").innerHTML =
    response.data.weather[0].description;
}

function searchLocation(position) {
  let apiKey = "3499ef150985eccadd080ff408a018df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
