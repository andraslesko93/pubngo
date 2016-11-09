function postCurrentPosition()
{
	//console.log("preclicked");
	getCurrentPosition();
	//nem a legszebb megoldas, de le kellene valahogy futnia a getCurrentPosition()-ek
	setTimeout(function(){
		var button = $("#addANewPubButton");
		console.log("clicked");
		var formValues = {};
		$.each($("form").serializeArray(), function (i, field) {
		    formValues[field.name] = field.value;
		});
		console.log(formValues);
	    $.ajax({
	    	type: 'POST',
	        url: "/post_current_position/",
	        dataType: "json",
	        data: {'csrfmiddlewaretoken': document.getElementsByName('csrfmiddlewaretoken')[0].value, 
	        	'lat':formValues.lat,
	        	'lng':formValues.lng,
	        	'pubName': formValues.pubName
	        	},
	        success: function (result) {
	          console.log("OK");
	          }
	    });
	}, 2000);
	
	
}
