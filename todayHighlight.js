
function geoFindMe() {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      window.location.href=`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    }
    navigator.geolocation.getCurrentPosition(success);
  }
  
  document.getElementById("btnOnLocationOnAction").addEventListener("click", geoFindMe);



function climateLoader(){
  
  // Check if the browser supports Geolocation API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);
  
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=0f85b552d4524a16a6550152242908&q=${latitude},${longitude}&days=10&aqi=yes&alerts=yes`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        document.getElementById("humidityPercentage").innerText = data.current.humidity+"%";
        document.getElementById("uvIndex").innerHTML = data.current.uv;
        document.getElementById("temperature").innerHTML = data.current.temp_c+"°C";
        document.getElementById("windSpeed").innerHTML = data.current.wind_kph+"km/h";
        document.getElementById("currentSituationIconInSearchCountry").src = data.current.condition.icon;
        document.getElementById("currentStatusInSearchCountry").innerText = data.current.condition.text;
        document.getElementById("windDirection").innerText= data.current.wind_mph+"mph"+" "+data.current.wind_dir;
        document.getElementById("currentTimeInSearchCountry").innerHTML = data.location.localtime.substr(11,16);
        dateStr = data.location.localtime.substr(0, 10);
        let date = new Date(dateStr);
        let options = { day: '2-digit', month: 'long', year: 'numeric' };
        let formattedDate = date.toLocaleDateString('en-GB', options);
        document.getElementById("currentDateInSearchCountry").innerText = formattedDate;

    });

  }, function(error) {
    console.error("Error occurred: " + error.message);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}
}

climateLoader();



document.getElementById("btnHomeOnAction").addEventListener("click",btnHomeOnAction);
function btnHomeOnAction(){
    window.location.href='index.html';
}

// Check if the browser supports Geolocation API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);
  }, function(error) {
    console.error("Error occurred: " + error.message);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}
