let txtLocation = document.getElementById("txtLocation");
document.getElementById("btnSearchOnAction").addEventListener("click", btnSearchOnAction);
let searchBar;

climateHeaderGroupBody = "";

function btnSearchOnAction() {
    searchBar = document.getElementById("searchBar").value;
    let txtLocation = document.getElementById("txtLocation");

    if (searchBar) {
        let climateHeaderGroupBody = `
            <h4 class="climate-header">Climate of ${searchBar}</h4>
            <hr class="line-below-searchBar">
        `;
        txtLocation.innerHTML = climateHeaderGroupBody;
    } else {
        console.log("Please enter a value...");
    }

    climateLoader(); 
}

document.getElementById("btnOnLocationOnAction").addEventListener("click",btnOnLocationOnAction)

function btnOnLocationOnAction(){
    searchBar = document.getElementById("searchBar").value;

    fetch(`https://restcountries.com/v3.1/name/${searchBar}`)
    .then(res => res.json())
    .then(data=>{
        console.log(data);
        window.location.href = data.maps.googleMaps;
    
    });
}

function climateLoader(){
    fetch(`https://api.weatherapi.com/v1/current.json?key=0f85b552d4524a16a6550152242908&q=${searchBar}&aqi=no`)
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
        document.getElementById("currentDateInSearchCountry").innerHTML = data.location.localtime.substr(0,10);
    });
}







document.getElementById("btnHomeOnAction").addEventListener("click",btnHomeOnAction);
function btnHomeOnAction(){
    window.location.href='index.html';
}
