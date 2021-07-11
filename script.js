// API Key
const apiKey= 'b97e0971f053e47fa5a7a92a78b0c889';

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherEl = document.getElementById('currentWeather');
const timeZone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

// Current Date & Time
headerDate();
function headerDate() {
    var currentTime= moment().format('LT');
    $(".time").text(currentTime);

    var currentDate= moment().format('dddd MMM Do');
    $(".date").text(currentDate);

    console.log(headerDate);
};

// API Fetch Request
getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
        .then(res => res.json()).then(data => {
        console.log(data)
        // showWeatherData(data);
        })

    })
}

