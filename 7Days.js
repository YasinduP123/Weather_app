let btnMonday = document.getElementById("btnMondayOnAction");
let btnTuesday = document.getElementById("btnTuesdayOnAction");
let btnWednesday = document.getElementById("btnWednesdayOnAction");
let btnThursday = document.getElementById("btnThursdayOnAction");
let btnFriday = document.getElementById("btnFridayOnAction");
let btnSaturday = document.getElementById("btnSaturdayOnAction");
let btnSunday = document.getElementById("btnSundayOnAction");

btnMonday.addEventListener("click", ()=> {
fetchClimateDataForDay("Monday")
});
btnTuesday.addEventListener("click", ()=> {
fetchClimateDataForDay("Tuesday")
});
btnWednesday.addEventListener("click", ()=> {
    fetchClimateDataForDay("Wednesday")
});
btnThursday.addEventListener("click", ()=> {
    fetchClimateDataForDay("Thursday")
});
btnFriday.addEventListener("click", ()=> {
    fetchClimateDataForDay("Friday")
});
btnSaturday.addEventListener("click", ()=> {
    fetchClimateDataForDay("Saturday")
});
btnSunday.addEventListener("click", ()=> {
    fetchClimateDataForDay("Sunday")
});


function fetchClimateDataForDay(selectedDay) {
    if (navigator.geolocation) {
        console.log(selectedDay);
        navigator.geolocation.getCurrentPosition(function(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            console.log("Latitude: " + latitude);
            console.log("Longitude: " + longitude);

            fetch(`https://api.weatherapi.com/v1/forecast.json?key=0f85b552d4524a16a6550152242908&q=${latitude},${longitude}&days=7&aqi=yes&alerts=yes`)
                .then(res => res.json())
                .then(data => {
                    let forecast = data.forecast.forecastday;
                    
                    let dayWeather;

                    if (selectedDay === "Friday") dayWeather = forecast.find(day => new Date(day.date).getDay() === 5);
                    if (selectedDay === "Monday") dayWeather = forecast.find(day => new Date(day.date).getDay() === 1);
                    if (selectedDay === "Tuesday") dayWeather = forecast.find(day => new Date(day.date).getDay() === 2);
                    if (selectedDay === "Wednesday") dayWeather = forecast.find(day => new Date(day.date).getDay() === 3);
                    if (selectedDay === "Thursday") dayWeather = forecast.find(day => new Date(day.date).getDay() === 4);
                    if (selectedDay === "Saturday") dayWeather = forecast.find(day => new Date(day.date).getDay() === 6);
                    if (selectedDay === "Sunday") dayWeather = forecast.find(day => new Date(day.date).getDay() === 0);

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
                        document.getElementById("showDateSelected").innerText = formattedDate + " " + `(${selectedDay})`;
                    } else {
                        console.log('Weather data for the selected day not found.');
                    }
                });
        }, function(error) {
            console.error("Error occurred: " + error.message);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

document.getElementById("btnHomeOnAction7Days").addEventListener("click", btnHomeOnAction7Days);

function btnHomeOnAction7Days() {
    window.location.href = 'index.html';
}
