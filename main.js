//DOM connections:
//initial information
const searchCity = document.getElementById("searchInput");
const cityName = document.getElementById("cityName");
const weatherStatus = document.getElementById("weatherState");
const temp = document.getElementById("temp");
const minTemp = document.getElementById("minTemp");
const maxTemp = document.getElementById("maxTemp");
const searchButton = document.getElementById("searchBtn");
const clearButton = document.getElementById("weatherAppClearBtn");
const moreInfo = document.getElementById("moreInfoBtn");
const body = document.getElementsByTagName("body")[0];

//additional information
const moreInfoSec = document.getElementById("moreInfo_Section");
const xBtn = document.getElementById("xBtn");
const stateImg = document.getElementById("moreInfoImage");
const country = document.getElementById("country");
const city_name = document.getElementById("city_name");
const weather_state = document.getElementById("weather_state");
const description = document.getElementById("description");
const average_temp = document.getElementById("average_temp");
const min_temp = document.getElementById("min_temp");
const max_temp = document.getElementById("max_temp");
const feels_like = document.getElementById("feels_like");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const windDeg = document.getElementById("windDeg");
const windSpeed = document.getElementById("windSpeed");
let moreInformation = "";

//C O N T R O L L E R:
searchButton.addEventListener("click", () => {
  findCity();
});

clearButton.addEventListener("click", () => {
  clearData();
});

moreInfo.addEventListener("click", () => {
  displayMoreInfo(moreInformation);
});

xBtn.addEventListener("click", () => {
  turnOffMoreInfoSec(moreInformation);
});

//M O D E L:
async function getTheTemp(city) {
  const API_key = "a8e71c9932b20c4ceb0aed183e6a83bb";
  const url = "https://api.openweathermap.org/data/2.5/weather";
  const full_url = `${url}?q=${city}&appid=${API_key}&units=imperial`;
  try {
    const response = await fetch(full_url);
    const data = await response.json();
    if (data.cod === "404") throw Error("City Not Found");
    showWeatherDate(data);
  } catch (err) {
    alert(err.message);
  }
  console.log(moreInformation);
}

function findCity() {
  const city = searchCity.value;
  getTheTemp(city);
}

//V I E W:
function showWeatherDate(weatherInfo) {
  moreInformation = weatherInfo;
  let weatherState = weatherInfo.weather[0].main;
  cityName.textContent = weatherInfo.name;
  weatherStatus.textContent = weatherState;
  temp.textContent = (((weatherInfo.main.temp - 32) * 5) / 9).toFixed(2);
  minTemp.textContent = (((weatherInfo.main.temp_min - 32) * 5) / 9).toFixed(2);
  maxTemp.textContent = (((weatherInfo.main.temp_max - 32) * 5) / 9).toFixed(2);
  backgroundPhotoChange(weatherState);
}

function backgroundPhotoChange(weather) {
  body.style.background = `url(images/${weather}.png)`;
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundSize = "cover";
}

function clearData() {
  searchCity.value = " ";
  cityName.textContent = "city name";
  weatherStatus.textContent = "Weather Status";
  temp.textContent = 10.5;
  minTemp.textContent = 9.5;
  maxTemp.textContent = 11.5;
  backgroundPhotoChange("background");
  moreInformation = "";
}

function displayMoreInfo(data) {
  if (data !== "") {
    let state = data.weather[0].main;

    backgroundPhotoChange("background");
    stateImg.src = `images/${state}.png`;
    moreInfoSec.style.visibility = "visible";
    country.textContent = data.sys.country;
    city_name.textContent = data.name;
    city_name.textContent = data.name;
    weather_state.textContent = state;
    description.textContent = data.weather[0].description;
    average_temp.textContent = (((data.main.temp - 32) * 5) / 9).toFixed(2);
    min_temp.textContent = (((data.main.temp_min - 32) * 5) / 9).toFixed(2);
    max_temp.textContent = (((data.main.temp_max - 32) * 5) / 9).toFixed(2);
    feels_like.textContent = (((data.main.feels_like - 32) * 5) / 9).toFixed(2);
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
    windDeg.textContent = data.wind.deg;
    windSpeed.textContent = data.wind.speed;
  } else {
    alert("Please, first choose a city!");
  }
}

function turnOffMoreInfoSec(data) {
  let image = data.weather[0].main;

  moreInfoSec.style.visibility = "hidden";
  backgroundPhotoChange(image);
}
