allMarkers = {};

function InitMap(map) {

    var cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/5c84c84721ef42c88f678b3686b02e92/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    });

    function SetDefautLocation() {
        var defaultLocation = new L.LatLng(0, 0); // geographical point (longitude and latitude)
        map.setView(defaultLocation, 2).addLayer(cloudmade);
    };
    
    	SetDefautLocation();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(

            function (position) {

                // Did we get the position correctly?
                console.log("User location is: " + position.coords.latitude + " " + position.coords.longitude);

                // To see everything available in the position.coords array:
                // for (key in position.coords) {alert(key)}

                var userLocation = new L.LatLng(position.coords.latitude, position.coords.longitude); // geographical point (longitude and latitude)

                //mapServiceProvider(position.coords.latitude,position.coords.longitude);
                map.setView(userLocation, 5).addLayer(cloudmade);
            },
            // next function is the error callback
            function (error) {
                switch (error.code) {
                    case error.TIMEOUT:
                        console.log('Timeout');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log('Position unavailable');
                        break;
                    case error.PERMISSION_DENIED:
                        console.log('Permission denied');
                        break;
                    case error.UNKNOWN_ERROR:
                        console.log('Unknown error');
                        break;
                }
                SetDefautLocation();
            }
            );

    };

    $.getJSON('/json/person_all.json', function (data) {        //loads and displays markers
        allMarkers = DisplayMarkers(data, map);
    });
}

function DisplayMarkers(markers, map) {
    var issueMarkers = {};
    var popup
    $.each(markers, function (index, value) {
        //console.log(index + ': ' + value);
        var markerLocation = new L.LatLng(value.X, value.Y);
        var marker = new L.Marker(markerLocation);

        if (typeof issueMarkers[value.category] === "undefined") {
            issueMarkers[value.category] = new L.LayerGroup();
        }
        issueMarkers[value.category].addLayer(marker);

        var concatenated = "<b>" + value.text + '</b><br /><button id="' + value.detailJson + '" onClick="loadAndShowDetail(this.id)">See detail</button>';
        if (value.imgLink !== "") {     //adding an image if there is a link text
            concatenated = concatenated + '<br /><img src="' + value.imgLink + '" />';
        }
        popup = marker.bindPopup(concatenated);
    });
    $.each(issueMarkers, function (layerName, layer) {
        map.addLayer(layer);
        console.log("Added a layer named:" + layerName);
    });
    var layersControl = new L.Control.Layers(null, issueMarkers);       //first parameter will get radio buttons in the "layers" tab, which we don't want, we want checkboxes
    map.addControl(layersControl);
    popup.openPopup();  //last added pop up opens, this may be strange but it is requested feature
    return issueMarkers;

}
