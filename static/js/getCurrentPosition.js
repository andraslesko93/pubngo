function getCurrentPosition()
{
	if (navigator.geolocation) 
	{
	    navigator.geolocation.getCurrentPosition(showPosition, function() {
	      handleLocationError(true, infoWindow, map.getCenter());
	    });
	} 
	else 
	{
	    // Browser doesn't support Geolocation
	    handleLocationError(false, infoWindow, map.getCenter());
	}
	function showPosition(position) 
	{
		var currentPosition = {
				lat : position.coords.latitude,
				lng : position.coords.longitude
		};
		//console.log(currentPosition)
		document.getElementById("newPubLat").value = position.coords.latitude;
		document.getElementById("newPubLng").value = position.coords.longitude;
	}
	
}
