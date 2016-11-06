function getCurrentPosition()
{
	lat=0;
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
		lat=2;
		var currentPosition = {
				lat : position.coords.latitude,
				lng : position.coords.longitude
		};
		//console.log(currentPosition)
		document.getElementById("lat").value = position.coords.latitude;
		document.getElementById("lng").value = position.coords.longitude;
	}
	
}
