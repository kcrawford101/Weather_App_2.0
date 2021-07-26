// API Key
const apiKey = 'b97e0971f053e47fa5a7a92a78b0c889';

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
function fetchCity(search) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => fetchWeather(data))
};


// // Weather Fetch
function fetchWeather(data) {    
        console.log(data)
// //from the data get the latitude and longitude to make the next api call
let latitude=data[0].lat;
let longitude=data[0].lon;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
            .then(res => res.json()).then(data => {
              
                displayWeather(data);
            });
    // });
};

// Display Current Weather Data
function displayWeather(data) {
console.log(data)    
    const name =document.querySelector("#search").value    
    const weather = data.current.weather[0].main;    
    const { temp, humidity } = data.current;
    const { wind_speed } = data.current;
    const { uvi } = data.current;

    document.querySelector(".city").innerText = name;    
    document.querySelector(".condition").innerText = weather;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humid").innerText = humidity + "%";
    document.querySelector(".wind").innerText = wind_speed + "km/h";
    // document.querySelector(".uvi").innerText = uvi + '%';

    if (uvi <= 2.99) {
        document.querySelector(".uvi").setAttribute('style', 'background-color: #ccff99; border: 2px solid green; border-radius: 3px; padding: 0px 3px 0px 3px;');
        document.querySelector(".uvi").textContent = `Low: ${uvi}`;
    } else if (uvi >= 3.00 && uvi <= 5.00) {
        document.querySelector(".uvi").setAttribute('style', 'background-color: #ffff99; border: 2px solid #cccc00; border-radius: 3px; padding: 0px 3px 0px 3px;');
        document.querySelector(".uvi").textContent = `Med-Low: ${uvi}`;
    } else if (uvi >= 6.00 && uvi <= 7.00) {
        document.querySelector(".uvi").setAttribute('style', 'background-color: #ffd699; border: 2px solid orange; border-radius: 3px; padding: 0px 3px 0px 3px;;');
        document.querySelector(".uvi").textContent = `Med-High: ${uvi}`;
    } else {
        document.querySelector(".uvi").setAttribute('style', 'background-color: #ffad99; border: 2px solid red; border-radius: 3px; padding: 0px 3px 0px 3px;');
        document.querySelector(".uvi").textContent = `High: ${uvi}`;
    }

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

//add button function next
document.querySelector(".searchbtn").addEventListener("click", function () {
const cityname =document.querySelector("#search").value
fetchCity(cityname)
});














