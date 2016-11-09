function initializeMaps() {
	
	var myOptions = {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	var infowindow = new google.maps.InfoWindow(); 

	var bounds = new google.maps.LatLngBounds();

	map.fitBounds(bounds);
}