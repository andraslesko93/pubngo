function getRatings()
{
	$.ajax({
		type: 'GET',
	    url: "/get_ratings/",
	    dataType: "json",
	    success: function (result){
	    	console.log("success");
	    	var newRatingList=$('<div id="ratingList"></div>');
	    	$.each(result, function(i, obj)
	    	{
	    		var form = $('<form id="pubForm-'+i+'"></form>');
	    		$('<h4>Please rate: <i>'+obj.pubName+'</i></h4>').appendTo(form);
	    		$('<p>How much was a beer?</p>').appendTo(form);
	    		$('<input type="number" name="price" min="1" placeholder="price in HuF">').appendTo(form);
	    		$('<p>Please choose a feeling that best describes the pub:</p>').appendTo(form);
	    		form.appendTo(newRatingList);
	    		var selectInput= $('<select name="feelingList" form="pubForm-'+i+'"></select>');
	    		$('<option value="beszelgetos">Beszelgetos</option>').appendTo(selectInput);
	    		$('<option value="szar">Szar</option>').appendTo(selectInput);
	    		$('<option value="romkocsma">Romkocsma</option>').appendTo(selectInput);
	    		selectInput.appendTo(newRatingList);
	    		$('<br/>').appendTo(newRatingList);
	    		$('<br/>').appendTo(newRatingList);
	    		$('<button type="submit" form="pubForm-'+i+'" class="btn btn-xs btn-primary">Rate</button>').appendTo(newRatingList);
	    		$('<br/>').appendTo(newRatingList);
	    		$('<br/>').appendTo(newRatingList);
	    	});
	    	$('#ratingList').replaceWith(newRatingList);
	    }
	});
	
}