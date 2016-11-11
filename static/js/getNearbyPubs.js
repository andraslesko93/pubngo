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
		    	//console.log("aight");
		    	//console.log(result);
		    	var newCheckinList = $('<div class="list-group" id="checkinList"></div>')
		    	$.each(result, function(i, obj)
		    	{
		    		var name= obj.pubName;
		    		var key = obj.key;
		    		newCheckinList.append('<a href="#" class="list-group-item" onclick="postCheckin('+key+','+'\''+name+'\')">'+name+'</a>');
		    	});
		    	$('#checkinList').replaceWith(newCheckinList);
		    }
		});
	});
}