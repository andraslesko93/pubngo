function getNearbyPubs()
{
	$.when(getCurrentPosition()).then(function(data, textStatus, jqXHR) {
		//console.log(data.coords.longitude, data.coords.latitude);

		$.ajax({
			type: 'GET',
		    url: "/get_nearby_pubs/",
		    dataType: "json",
		    data: { 
		    		'lat':data.coords.latitude,
		    		'lng':data.coords.longitude,
		    	},
		    success: function (result){
		    	var newCheckinList = $('<div class="list-group" id="checkinList"></div>')
		    	if( result.length == 0 ) {
		    		newCheckinList.append('<div align="center"><i style="color:#F0AD4E" class="fa fa-frown-o fa-5x" aria-hidden="true"></i>');
		    		newCheckinList.append('<p align="center" style="color:#F0AD4E"><strong>There are pubs arround, or you have checked into all of them.</strong></p>');
		    	}
		    	else{
		  	      	newCheckinList.append('<h4 id="checkinTitle">Choose from the nearby pubs: </h4>');
			    	$.each(result, function(i, obj)
			    	{
			    		var name= obj.pubName;
			    		var key = obj.key;
			    		newCheckinList.append('<a href="#" class="list-group-item" onclick="postCheckin('+key+','+'\''+name+'\')">'+name+'</a>');
			    	});
		    	}
		    	$('#checkinList').replaceWith(newCheckinList);
		    }
		});
	});
}