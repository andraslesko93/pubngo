var myOptions = {
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	mapTypeControl: false
};

var map = new google.maps.Map(document.getElementById("map_canvas_discover"), myOptions);
var infoWindow = new google.maps.InfoWindow(); 
var marker, i;
var beer = '/media/beer_pin.png'
var blue_dot = '/media/bluecircle.png';
var bounds = new google.maps.LatLngBounds();


var id;
var userMarker;

getAllPubs();

function getAllPubs()
{
	var pubs2=[];
	$.ajax({
		type: 'GET',
		url: "/get_all_pubs/",
		dataType: "json",
		success: function (result){		
			var pubs = [];
		   	$.each(result, function(i, obj)
		   	{
		   		var temp = [obj.pubName, obj.lat, obj.lng];
		   		pubs.push(temp);
		   	});
		
		   	for (i = 0; i < pubs.length; i++) { 
		   		var pos = new google.maps.LatLng(pubs[i][1], pubs[i][2]);
		   		bounds.extend(pos);
		   		marker = new google.maps.Marker({
		   			position: pos,
		   			map: map,
		   			icon: beer
		   		});
		   		google.maps.event.addListener(marker, 'click', (function(marker, i) {
		   			return function() {
		   				infoWindow.setContent(pubs[i][0]);
		   				infoWindow.open(map, marker);
		   			}
		   		})(marker, i));
		   	}
		   	map.fitBounds(bounds);		   	
		 }
	});
}



if (navigator.geolocation) {
	options = {
			  enableHighAccuracy: false,
			  timeout: 5000,
			  maximumAge: 1000
	};
	id = navigator.geolocation.watchPosition(
		function(position) {
			
			var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			if (!userMarker) {
				userMarker = new google.maps.Marker({
					position: myLatLng,
					map: map,
					icon: blue_dot
				});
				map.setCenter(myLatLng);
			} else {
				userMarker.setPosition(myLatLng);
			}
	    }, 
	    function() {
	    	//handleLocationError(true, infoWindow, map.getCenter());
	    }, 
	    options
	);
} else {
  // Browser doesn't support Geolocation
  //handleLocationError(false, infoWindow, map.getCenter());
}