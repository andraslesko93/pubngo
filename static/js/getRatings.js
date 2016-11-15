function getRatings()
{
	$.ajax({
		type: 'GET',
	    url: "/get_ratings/",
	    dataType: "json",
	    success: function (result){
	    	console.log("success");
	    	var ratingList = $('#ratingList');
	    	$.each(result, function(i, obj)
	    	{
	    		console.log(obj.key);
	    	});
	    }
	});
	
}