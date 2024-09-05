
//http://api.weatherapi.com/v1/current.json?key=0f85b552d4524a16a6550152242908&q=Real-time weather&aqi=no ====>  Current weather 
//http://api.weatherapi.com/v1/current.json?key=0f85b552d4524a16a6550152242908&q=Sri Lanka&aqi=no ====> srilankan weather
//http://api.weatherapi.com/v1/current.json?key=0f85b552d4524a16a6550152242908&q=Location data&aqi=no ====> Location based
//http://api.weatherapi.com/v1/forecast.json?key=0f85b552d4524a16a6550152242908&q=Historical weather&days=10&aqi=yes&alerts=yes
//http://api.weatherapi.com/v1/forecast.json?key=0f85b552d4524a16a6550152242908&q=Weather Alerts &days=10&aqi=yes&alerts=yes


let itemCard = document.getElementById("itemCard");

let showCurrentDate = document.getElementById("showCurrentDate");
let showCurrentTime = document.getElementById("showCurrentTime");
let showCurrentTemp = document.getElementById("showCurrentTemp");
let currentWindDir = document.getElementById("currentWindDir");

fetch("https://api.weatherapi.com/v1/current.json?key=0f85b552d4524a16a6550152242908&q=Sri Lanka&aqi=no")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        showCurrentTime.innerHTML = data.location.localtime.substr(11, 16);
        dateStr = data.location.localtime.substr(0, 10);
        let date = new Date(dateStr);
        let options = { day: '2-digit', month: 'long', year: 'numeric' };
        let formattedDate = date.toLocaleDateString('en-GB', options);
        showCurrentDate.innerText = formattedDate;
        showCurrentTemp.innerText = data.current.temp_c + "°C";
        currentWindDir.innerText = data.current.wind_kph + "km/h" + " " + data.current.wind_degree + "°" + " " + data.current.wind_dir;

    })

let currentSituation = document.getElementById("currentSituation");

fetch("https://api.weatherapi.com/v1/forecast.json?key=0f85b552d4524a16a6550152242908&q=Colombo&days=10&aqi=yes&alerts=yes")
    .then(res => res.json())
    .then(data => {
        console.log(data.current.condition.text);
        currentSituation.innerText = data.current.condition.text;
    });



let lightMode = document.getElementById("lightMode").addEventListener("click", btnLightModeOnAction);
let darkMode = document.getElementById("darkMode").addEventListener("click", btnDarkModeOnAction);
let homeView = document.querySelector('.home-view');
let forcastToday = document.querySelector('today-forecast');
let lineBetweenMaincardAndForecast = document.querySelector('.line-between-maincard-and-forecast');


function btnDarkModeOnAction() {
    loadForcast("rgba(0, 0, 0, 0.447)","white");
    homeView.style.backgroundColor = 'rgba(0, 0, 0, 0.447)';
    lineBetweenMaincardAndForecast.style.color = "white";
    lineBetweenMaincardAndForecast.style.border = "2px solid white";
}

function btnLightModeOnAction() {
    loadForcast("rgba(255, 255, 255, 0.447)","black");
    homeView.style.backgroundColor = 'rgba(255, 255, 255, 0.447)';
    lineBetweenMaincardAndForecast.style.color = "2px solid black";
    lineBetweenMaincardAndForecast.style.border = "2px solid black";


}


let hourArray = document.getElementById("hourArray");

cardBody = "";

function loadForcast(cssbgColor,cssFontColor){
    console.log(cssbgColor);
    
    fetch("https://api.weatherapi.com/v1/forecast.json?key=0f85b552d4524a16a6550152242908&q=Colombo&days=10&aqi=yes&alerts=yes")
    
    .then(res => res.json())
    .then(data => {
        console.log(data);

        let firstHour = data.forecast.forecastday[0].hour;
        let cardBody = "";

        firstHour.forEach(element => {
            cardBody += `
                <div class="col-sm-1 col">
                    <div class="today-forecast" style="background-color:${cssbgColor}; color:${cssFontColor};border:2px solid ${cssFontColor};">
                        <p class="hours">${element.time.substr(11, 5)}</p>
                        <hr class="inner-line-today-forcast" style="color:${cssFontColor}; border:2px solid ${cssFontColor};">
                        <img src="${element.condition.icon}" class="forecast-img">
                        <p class="forecast-details">${element.temp_c}°C</p>
                    </div>
                </div>
            `;
        });
        hourArray.innerHTML = cardBody;
    })
}

loadForcast("rgba(0, 0, 0, 0.447)","white");
