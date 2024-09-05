function geoFindMe() {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      window.location.href=`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    }
    navigator.geolocation.getCurrentPosition(success);
  }
  
  document.getElementById("btnOnLocationOnAction").addEventListener("click", geoFindMe);
