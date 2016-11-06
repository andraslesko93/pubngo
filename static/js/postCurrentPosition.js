//GET CURRENT POSITION itt legyen es SET it to form


var button = $("#addANewPubButton");
button.click(function() { 
			console.log("clicked");
			var formValues = {};
			$.each($("form").serializeArray(), function (i, field) {
			    formValues[field.name] = field.value;
			});
	        $.ajax({
	            url: document.url,
	            type: 'POST',
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
});
