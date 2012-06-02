function ShowMap() {


    var map = new L.Map('map');
    var cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/5c84c84721ef42c88f678b3686b02e92/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    });

    userLocation = Getlocation();
    map.setView(userLocation, 13).addLayer(cloudmade);
}

function Getlocation() {
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition( 
 
            function (position) {  
 
                // Did we get the position correctly?
                console.log(position.coords.latitude);
 
                // To see everything available in the position.coords array:
                // for (key in position.coords) {alert(key)}
              
                return new L.LatLng(position.coords.latitude, position.coords.longitude); // geographical point (longitude and latitude)
                //mapServiceProvider(position.coords.latitude,position.coords.longitude);
 
            }, 
            // next function is the error callback
            function (error)
            {
                switch(error.code) 
                {
                    case error.TIMEOUT:
                        alert ('Timeout');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert ('Position unavailable');
                        break;
                    case error.PERMISSION_DENIED:
                        alert ('Permission denied');
                        break;
                    case error.UNKNOWN_ERROR:
                        alert ('Unknown error');
                        break;
                }
            }
            );
    
    }
    else // finish the error checking if the client is not compliant with the spec
    {
        return new L.LatLng(0,0); // geographical point (longitude and latitude)
    }
}