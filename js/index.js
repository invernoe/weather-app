const apiKey = "83fb001499a44a3b96b04403240301";
const numberOfDays = 3;
const baseUrl =
  "https://api.weatherapi.com/v1/forecast.json?key=" +
  apiKey +
  "&days=" +
  numberOfDays;
const defaultCity = "London";

let locationTextInput = document.querySelector("#locationTextInput");
//data to be modified
const modifiableElements = {
  current: {
    city: document.querySelector("#cityText"),
    day: document.querySelector("#weather-content-date-1"),
    temp: document.querySelector("#current-degree-text"),
    weatherDetails: {
      rain: document.querySelector("#current-weather-details-rain"),
      windSpeed: document.querySelector("#current-weather-details-wind-speed"),
      windDirection: document.querySelector(
        "#current-weather-details-wind-direction"
      ),
    },
  },
  dates: document.querySelectorAll("[id^='weather-content-day-']"),
  conditions: document.querySelectorAll("[id^='weather-content-condition-']"),
  forecastPictures: document.querySelectorAll("picture img"),
  maxDegrees: document.querySelectorAll("[id^='weather-content-max-degree-']"),
  minDegrees: document.querySelectorAll("[id^='weather-content-min-degree-']"),
};

async function initData() {
  await fetchWeatherData(defaultCity);
  getLocation();
}

async function fetchWeatherData(queryLocation) {
  let response = await fetch(baseUrl + "&q=" + queryLocation);
  let finalResponse = await response.json();

  console.log(finalResponse);
  refreshDisplay(finalResponse);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(saveCoords);
  }
}

function saveCoords(position) {
  currentCoords = position.coords.latitude + "," + position.coords.longitude;
  //fetch data based on current coordinates
  fetchWeatherData(currentCoords);
}

function fetchWeatherDataTextInput() {
  let city = locationTextInput.value;
  fetchWeatherData(city);
}

function refreshDisplay(response) {
  modifiableElements.current.city.innerHTML = response.location.name;
  modifiableElements.current.temp.innerHTML = response.current.temp_c + "°C";

  modifiableElements.current.weatherDetails.rain.innerHTML =
    response.forecast.forecastday[0].day.daily_chance_of_rain + "%";
  modifiableElements.current.weatherDetails.windSpeed.innerHTML =
    Math.round(Number(response.current.wind_kph)) + "km/h";
  modifiableElements.current.weatherDetails.windDirection.innerHTML =
    parseWindDir(response.current.wind_dir);

  let date = new Date(response.forecast.forecastday[0].date);
  let dayMonth = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
  modifiableElements.current.day.innerHTML = dayMonth;

  for (let i = 0; i < numberOfDays; i++) {
    date = new Date(response.forecast.forecastday[0].date);
    let weekDay = date.toLocaleDateString("en-US", { weekday: "long" });
    modifiableElements.dates[i].innerHTML = weekDay;

    modifiableElements.conditions[i].innerHTML =
      response.forecast.forecastday[i].day.condition.text;
    modifiableElements.forecastPictures[i].src =
      response.forecast.forecastday[i].day.condition.icon;

    //becuase current does not have a max and min degrees elements, we only have 2 elements in node list therefore we decrement
    if (i > 0) {
      modifiableElements.maxDegrees[i - 1].innerHTML =
        response.forecast.forecastday[i].day.maxtemp_c + "°C";
      modifiableElements.minDegrees[i - 1].innerHTML =
        response.forecast.forecastday[i].day.mintemp_c + "°C";
    }
  }
}

function parseWindDir(windDirCode) {
  let result = "";

  for (let i = 0; i < windDirCode.length; i++) {
    const element = windDirCode[i].toLowerCase();
    if (i > 0) {
      result += " ";
    }

    switch (element) {
      case "n":
        result += "North";
        break;
      case "e":
        result += "East";
        break;
      case "w":
        result += "West";
        break;
      default:
        result += "South";
        break;
    }
  }

  return result;
}

initData();
