$(function () {
            var map = new L.Map('map');
            InitMap(map);
            
            map.on('click', onMapClick);
            
            var popup = new L.Popup();

            function onMapClick(e) {
                $("#id_lat").val(e.latlng.lat);
                $("#id_lon").val(e.latlng.lng);
                var latlngStr = '(' + e.latlng.lat + ', ' + e.latlng.lng + ')';

                popup.setLatLng(e.latlng);
                popup.setContent("You clicked the map at " + latlngStr);

                map.openPopup(popup);
            }
                        
});
