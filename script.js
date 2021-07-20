// API Key
const apiKey = 'b97e0971f053e47fa5a7a92a78b0c889';

// const timeEl = document.getElementById('time');
// const dateEl = document.getElementById('date');
const currentWeatherEl = document.getElementById('currentWeather');
const timeZone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const search = document.getElementById('search')
// const weatherList = document.getElementById('weather-list')

// Current Date & Time
headerDate();
function headerDate() {
    var currentTime = moment().format('LT');
    $(".time").text(currentTime);

    var currentDate = moment().format('dddd MMM Do');
    $(".date").text(currentDate);

    console.log(headerDate);
};

// API Fetch Request
// getWeatherData();


//get the name from the user
//pass the city name to fetchWeather
//after that is done pass the lat and lon to getWeatherData
//populate the html

function fetchCity(search) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => fetchWeather(data))
};



// // Weather Fetch
function fetchWeather(data) {
    // navigator.geolocation.getCurrentPosition((success) => {
        console.log(data)

        // let { latitude, longitude } = success.coords;

// //from the data get the latitude and longitude to make the next api call
let latitude=data[0].lat;
let longitude=data[0].lon;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
            .then(res => res.json()).then(data => {
              
                displayWeather(data);
            });
    // });
};


// City Search




// Display Current Weather Data
function displayWeather(data) {
console.log(data)
    // timeZone.innerHTML = data.timezone;
    // countryEl.innerHTML = data.lat + 'N ' + data.lon + 'E ';
    const name =document.querySelector("#search").value
    // const { name } = data;
    const weather = data.current.weather[0].main;
    // Get Icon
    const { temp, humidity } = data.current;
    const { wind_speed } = data.current;
    const { uvi } = data.current;

    document.querySelector(".city").innerText = "Weather in " + name;
    // document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".condition").innerText = weather;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humid").innerText = humidity + "%";
    document.querySelector(".wind").innerText = wind_speed + "km/h";
    document.querySelector(".uvi").innerText = uvi + '%';

    // 5 Day Weather Forecast Display Loop
    let otherDayForecast = ''
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <div class="temp">Night - ${day.temp.night}°C</div>
            <div class="temp">Day - ${day.temp.day}C</div>
        </div> `

        } else {
            otherDayForecast += `
            <div class="weather-forecast-item">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">                    
            <div class="temp">Night: ${day.temp.night}°C</div>
            <div class="temp">Day: ${day.temp.day}°C</div>                    
            </div>`
        }
    })
    weatherForecastEl.innerHTML = otherDayForecast

};



// let weatherSearch = {
//     fetchWeather: function (city) {
//         fetch(queryURL)
//             .then((response) => response.json())
//             .then((data) => this.displayWeather(data))
//     },
// // 





//add button function next
document.querySelector(".searchbtn").addEventListener("click", function () {
const cityname =document.querySelector("#search").value
fetchCity(cityname)
});
// document.querySelector(".search").addEventListener("keyup", function (event) {
//     if (event.key == "Enter") {
//         fetchCity.search();
//     }
// });











