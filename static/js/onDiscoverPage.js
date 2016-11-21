var markers = [
	['Baráti kávézó', 47.5042817, 19.064201799999978],
	['Gong café', 47.4993127, 19.07003450000002],
	['Bölcső bar & food', 47.4772765, 19.05395390000001],
	['Andersen pub', 47.4904009, 19.069585899999993],
	['Ördög gödör', 47.5008524, 19.06876890000001],
];
	
var myOptions = {
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	mapTypeControl: false
};

var gmarkers;
var map = new google.maps.Map(document.getElementById("map_canvas_discover"),myOptions);
var infoWindow = new google.maps.InfoWindow(); 
var marker, i;
var bounds = new google.maps.LatLngBounds();
for (i = 0; i < markers.length; i++) { 
	var pos = new google.maps.LatLng(markers[i][1], markers[i][2]);
	bounds.extend(pos);
	marker = new google.maps.Marker({
		position: pos,
		map: map
	});
	google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
			infoWindow.setContent(markers[i][0]);
			infoWindow.open(map, marker);
		}
	})(marker, i));
}
map.fitBounds(bounds);

var id;
var userMarker;
if (navigator.geolocation) {	
	id = navigator.geolocation.watchPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    var im = 'https://www.robotwoods.com/dev/misc/bluecircle.png';
    var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if (!userMarker) {
    	userMarker = new google.maps.Marker({
    	    position: myLatLng,
    	    map: map,
    	    icon: im
    	});
    	map.setCenter(pos);
    } else {
    	userMarker.setPosition(myLatLng);
    }
  
    
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }