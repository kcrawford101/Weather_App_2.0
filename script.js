// API Key
const apiKey= 'b97e0971f053e47fa5a7a92a78b0c889';

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
    var currentTime= moment().format('LT');
    $(".time").text(currentTime);

    var currentDate= moment().format('dddd MMM Do');
    $(".date").text(currentDate);

    console.log(headerDate);
};

// API Fetch Request
// getWeatherData();

// Weather Variable
let weather = {
    // Fetch Current Weather Function
     getWeatherData: function() {
        navigator.geolocation.getCurrentPosition((success) => {
            
            let {latitude, longitude } = success.coords;
    
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
            .then(res => res.json()).then(data => {
            console.log(data)
            displayWeather(data);
            });
            // Display Current Weather Function
            function displayWeather (data) {
    
                timeZone.innerHTML = data.timezone;
                countryEl.innerHTML =data.lat + 'N ' + data.lon + 'E ';
                           
                // const { name } = data;
                const  weather  = data.current.weather[0].main;
                // Get Icon
                const { temp, humidity } = data.current;
                const { wind_speed } = data.current;
                const { uvi } = data.current;                    
                
                // document.querySelector(".city").innerText = "Weather in " + name;
                // document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
                document.querySelector(".condition").innerText = weather;
                document.querySelector(".temp").innerText = temp + "°C";
                document.querySelector(".humid").innerText = humidity + "%";
                document.querySelector(".wind").innerText = wind_speed + "km/h";
                document.querySelector(".uvi").innerText = uvi + '%';
    
                // 5 Day Weather Forecast Display Loop
                let otherDayForecast = ''
                data.daily.forEach((day, idx) => {
                    if(idx == 0){
                        currentTempEl.innerHTML = `
                        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                    <div class="other">
                        <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                        <div class="temp">Night - ${day.temp.night}°C</div>
                        <div class="temp">Day - ${day.temp.day}C</div>
                    </div> `
    
                    }else{
                        otherDayForecast += `
                        <div class="weather-forecast-item">
                        <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">                    
                        <div class="temp">Night: ${day.temp.night}°C</div>
                        <div class="temp">Day: ${day.temp.day}°C</div>                    
                        </div>`
                    }
                })
                weatherForecastEl.innerHTML = otherDayForecast                 
                
            };       
    
        });
        
           
    }
};

let queryURL= `api.openweathermap.org/data/2.5/weather?q={city name}&appid=${apiKey}`;

let weatherSearch = {
    getWeatherData: function (city) {
        fetch(queryURL) 
            .then ((response) => response.json())
            .then ((data) => this.displayWeather(data))
    },
    

    
}
document.querySelector(".search-bar button").addEventListener("click", function() {
    weatherSearch.search();
});
document.querySelector(".search").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weatherSearch.search();
    }
});
weather.getWeatherData("")









