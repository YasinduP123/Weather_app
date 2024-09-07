
let dayButtons = {
    'Monday': document.getElementById("btnMondayOnAction"),
    'Tuesday': document.getElementById("btnTuesdayOnAction"),
    'Wednesday': document.getElementById("btnWednesdayOnAction"),
    'Thursday': document.getElementById("btnThursdayOnAction"),
    'Friday': document.getElementById("btnFridayOnAction"),
    'Saturday': document.getElementById("btnSaturdayOnAction"),
    'Sunday': document.getElementById("btnSundayOnAction")
};

Object.keys(dayButtons).forEach(day => {
    dayButtons[day].addEventListener("click", () => handleDayClick(day));
});

function handleDayClick(day) {
    console.log(day); 
    fetchClimateDataForDay(day);
}

function fetchClimateDataForDay(selectedDay) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=0f85b552d4524a16a6550152242908&q=Sri Lanka&days=7&aqi=yes&alerts=yes`)
        .then(res => res.json())
        .then(data => {
            let forecast = data.forecast.forecastday;
            let daysMap = {
                'Monday': forecast.find(day => new Date(day.date).getDay() === 1),
                'Tuesday': forecast.find(day => new Date(day.date).getDay() === 2),
                'Wednesday': forecast.find(day => new Date(day.date).getDay() === 3),
                'Thursday': forecast.find(day => new Date(day.date).getDay() === 4),
                'Friday': forecast.find(day => new Date(day.date).getDay() === 5),
                'Saturday': forecast.find(day => new Date(day.date).getDay() === 6),
                'Sunday': forecast.find(day => new Date(day.date).getDay() === 0)
            };

            let dayWeather = daysMap[selectedDay];

            if (dayWeather) {
                console.log(`${selectedDay}'s Weather:`, dayWeather.day.condition.text);
                console.log("Max Temp:", dayWeather.day.maxtemp_c, "°C");
                console.log("Min Temp:", dayWeather.day.mintemp_c, "°C");
                console.log("Humidity:", dayWeather.day.avghumidity, "%");

                document.getElementById("daysHumidityPercentage").innerText = dayWeather.day.avghumidity + "%";
                document.getElementById("daysUvIndex").innerText = dayWeather.day.uv;
                document.getElementById("daysTemperature").innerText = dayWeather.day.avgtemp_c + "°C";
                document.getElementById("daysWindSpeed").innerText = dayWeather.day.maxwind_kph + "kph";
                document.getElementById("dailyChanceToRain").innerText = dayWeather.day.daily_chance_of_rain + "%";
                document.getElementById("daysStatusIcon").src = dayWeather.day.condition.icon;
                document.getElementById("daysCondition").innerText = dayWeather.day.condition.text;

                let date = new Date(dayWeather.date);
                let options = { day: '2-digit', month: 'long', year: 'numeric' };
                let formattedDate = date.toLocaleDateString('en-GB', options);
                document.getElementById("showDateSelected").innerText = formattedDate+" "+`(${selectedDay})`;
            } else {
                console.log('Weather data for the selected day not found.');
            }
        })
}

document.getElementById("btnHomeOnAction7Days").addEventListener("click",btnHomeOnAction7Days);

function btnHomeOnAction7Days(){
    window.location.href = 'index.html'
}