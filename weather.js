const weather = document.querySelector(".js-weather");

const API_KEY = "3ba2c44f135bd62b412123c513820ecb";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
    // then : fetch가 완료되길 기다리는 거
}
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    // latitude: latitude, longitude: longtitude
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
function handleGeoError() {

}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
    /*
    첫 번째 인자는 좌표를 가져오는데 성공했을 때 처리하는 함수
    두 번째 인자는 좌표를 가져오는데 실패했을 때 처리하는 함수
    */
}
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    }
    else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}
function init() {
    loadCoords();
}

init();