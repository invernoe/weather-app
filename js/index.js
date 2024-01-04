const apiKey = "83fb001499a44a3b96b04403240301";
const numberOfDays = 3;
const baseUrl = "http://api.weatherapi.com/v1/forecast.json?key=" + apiKey + "&days=" + numberOfDays;
const defaultCity = "London";

let locationTextInput = document.querySelector("#locationTextInput");
//data to be modified
const refreshedData = {
    currentDay: document.querySelector("#weather-content-date-1"),
    dates: document.querySelectorAll("[id^='weather-content-day-']"),

}

getLocation();
fetchWeatherData(defaultCity);

async function fetchWeatherData(queryLocation) {
  let response = await fetch(baseUrl + "&q=" + queryLocation);;
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
    let city = locationTextInput.value();
    fetchWeatherData(city);
}

function refreshDisplay(response) {
    for (let i = 0; i < numberOfDays; i++) {
        let date = new Date(response.forecast.forecastday[i].date).toLocaleDateString('en-US', {weekday: "long"});
        
    }
    
}