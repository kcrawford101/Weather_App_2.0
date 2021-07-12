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
getWeatherData();
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
        .then(res => res.json()).then(data => {
        console.log(data)
        displayWeather(data);
        });
        // Display Function
        function displayWeather (data) {
                       
            // const { name } = data;
            const  weather  = data.current.weather[0].main;
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

            // 5 Day Weather Forecast Display
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


        
            
        }
        

    });
    
       
};






