const apiKey = "83fb001499a44a3b96b04403240301"
const baseUrl = "http://api.weatherapi.com/v1/current.json?key=&q=London"
const defaultCity = "London"
q=48.8567,2.3508

getLocation();

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

function showPosition(position) {
    console.log(position)
}