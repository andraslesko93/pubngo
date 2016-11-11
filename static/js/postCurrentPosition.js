function postCurrentPosition()
{
$.when(getCurrentPosition()).then(function(data, textStatus, jqXHR) {
    console.log(data.coords.longitude, data.coords.latitude);
    var button = $("#addANewPubButton");
	console.log("clicked");
	var formValues = {};
	$.each($("#addANewPubForm").serializeArray(), function (i, field) {
	    formValues[field.name] = field.value;
	});
	console.log(formValues);
	$.ajax({
		type: 'POST',
	    url: "/post_current_position/",
	    dataType: "json",
	    data: {'csrfmiddlewaretoken': document.getElementsByName('csrfmiddlewaretoken')[0].value, 
	    	'lat':data.coords.latitude,
	    	'lng':data.coords.longitude,
	    	'pubName': formValues.pubName
	    	},
	    success: function (result) {
	      //console.log("OK");
	      $('#addANewPubForm').hide();
	      $('#addANewPubButton').hide();
	      $('#newPubModal').append('<h4 style="color:green">You have successfully added a new pub! The admins will check it\'s validity, and then it will appear in the system. Thanks :)</h4> ');
	      }
	});	

});
}