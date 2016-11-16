function getRatings()
{
	//get feelings:
	var feelings={}; 
	$.ajax({
		type: 'GET',
	    url: "/get_pub_feelings/",
	    dataType: "json",
	    success: function (result){
	    	$.each(result, function(i, obj){
	    		feelings[i]=obj.feeling;
	    	});
	    }
	});
	
	$.ajax({
		type: 'GET',
	    url: "/get_ratings/",
	    dataType: "json",
	    success: function (result){
	    	var newRatingList=$('<div id="ratingList"></div>');
	    	if( result.length == 0 ) {
	    		newRatingList.append('<div align="center"><i style="color:#5CB85C" class="fa fa-check-circle-o fa-5x" aria-hidden="true"></i>');
	    		newRatingList.append('<p align="center" style="color:#5CB85C"><strong>You don\'t have to rate any pubs now. :).</strong></p>');
	    		console.log("faszombamár");
	    	}
	    	else{
		    	$.each(result, function(i, obj)
		    	{
		    		var div = $('<div id="ratingDiv-'+obj.ratingKey+'" ></div>');
		    		var form = $('<form id="ratingForm-'+obj.ratingKey+'"></form>');
		    		$('<h4>Please rate: <i>'+obj.pubName+'</i></h4>').appendTo(form);
		    		$('<p>How much was a beer?</p>').appendTo(form);
		    		$('<input type="number" required name="price" min="1" placeholder="price in HuF">').appendTo(form);
		    		$('<p>Please choose a feeling that best describes the pub:</p>').appendTo(form);
		    		$('<input type="hidden" value="'+obj.ratingKey+'" name="ratingKey">').appendTo(form);
		    		form.appendTo(div);
		    		var selectInput= $('<select name="feeling" form="ratingForm-'+obj.ratingKey+'"></select>');
		    		
			    	$.each(feelings, function(i, obj){
			    		$('<option value="'+feelings[i]+'">'+feelings[i]+'</option>').appendTo(selectInput);
			    		//console.log(feelings[i]);
			    	});
		    		selectInput.appendTo(div);
	
		    		$('<br/>').appendTo(div);
		    		$('<br/>').appendTo(div);
		    		$('<button type="submit" form="ratingForm-'+obj.ratingKey+'" class="btn btn-xs btn-primary" onclick="postRating('+obj.ratingKey+','+'\''+obj.pubName+'\')">Rate</button>').appendTo(div);
		    		$('<br/>').appendTo(div);
		    		$('<br/>').appendTo(div);
		    		newRatingList.append(div);
		    	});
	    	}
	    	$('#ratingList').replaceWith(newRatingList);
	    }
	});
}