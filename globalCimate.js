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
            <hr class="border-3" style="color:white; border:2px solid white">
        `;
        txtLocation.innerHTML = climateHeaderGroupBody;
    } else {
        console.log("Please enter a value...");
    }

    climateLoader(); 
}

document.getElementById("btnOnLocationOnAction").addEventListener("click",btnOnLocationOnAction)

function btnOnLocationOnAction(){
    fetch(`https://nominatim.openstreetmap.org/search?q=${searchBar}&format=json`)
    .then(res => res.json())
    .then(data => {
        const { lat, lon } = data[0];
        const osmUrl = `https://www.openstreetmap.org/#map=18/${lat}/${lon}`;
        console.log(osmUrl);
        window.location.href = osmUrl
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
        dateStr = data.location.localtime.substr(0, 10);
        let date = new Date(dateStr);
        let options = { day: '2-digit', month: 'long', year: 'numeric' };
        let formattedDate = date.toLocaleDateString('en-GB', options);
        document.getElementById("currentDateInSearchCountry").innerText = formattedDate;

    });
}


document.getElementById("btnHomeOnAction").addEventListener("click",btnHomeOnAction);
function btnHomeOnAction(){
    window.location.href='index.html';
}
