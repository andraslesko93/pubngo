function postRating(ratingKey, name)
{
	$('#ratingForm-'+ratingKey+'').submit(function(event){
	    event.preventDefault();
	});
	if ($('#ratingForm-'+ratingKey+'')[0].checkValidity()==false)
	{
		return;
	}
	var formValues = {};
	$.each($('#ratingForm-'+ratingKey+'').serializeArray(), function (i, field) {
	    formValues[field.name] = field.value;
	});
	console.log(formValues);
	
	$.ajax({
		type: 'POST',
	    url: "/post_rating/",
	    dataType: "json",
	    data: {
	    	'csrfmiddlewaretoken': document.getElementsByName('csrfmiddlewaretoken')[0].value,
	    	'pk': ratingKey,
	    	'feeling': formValues.feeling,
	    	'price': formValues.price
	    	},
	    success: function () {
	    	var pendingRatingCounter = $('#ratingCounter').html();
	    	pendingRatingCounter = parseInt(pendingRatingCounter);
	    	pendingRatingCounter= pendingRatingCounter -1;
	    	if (pendingRatingCounter == 0)
	    		{
	    		$('#ratingCounter').hide();
	    		}
	    	$('#ratingCounter').html(pendingRatingCounter);
			var newRatingDiv = $('<div id="ratingDiv-'+ratingKey+'" ></div>');
	    	newRatingDiv.append('<div align="center"><i style="color:#5CB85C" class="fa fa-check-circle-o fa-5x" aria-hidden="true"></i></div><br/>')
		    newRatingDiv.append('<p align="center" style="color:#5CB85C"><strong>You have successfully rated the pub: <i>'+name+'</i></strong></p><br/>');
	    	$('#ratingDiv-'+ratingKey+'').replaceWith(newRatingDiv);
	    }
	});
}