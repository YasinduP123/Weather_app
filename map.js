function geoFindMe() {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      window.location.href=`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    }
    navigator.geolocation.getCurrentPosition(success);
  }
  
  document.getElementById("btnOnLocationOnAction").addEventListener("click", geoFindMe);


  // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDIuS9U2f3q-bCcapt8s_KPrjGobiiTzlg