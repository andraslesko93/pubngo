function postCurrentPositionAsAPub()
{
	$('#addANewPubForm').submit(function(event){
	    event.preventDefault();

	});
	if ($('#addANewPubForm')[0].checkValidity()==false)
	{
		return;
	}
$.when(getCurrentPosition()).then(function(data, textStatus, jqXHR) {
	console.log(data.coords.longitude, data.coords.latitude);
    var button = $("#addANewPubButton");
	var formValues = {};
	$.each($("#addANewPubForm").serializeArray(), function (i, field) {
	    formValues[field.name] = field.value;
	});
	console.log(formValues);
	$.ajax({
		type: 'POST',
	    url: "/post_current_position_as_a_pub/",
	    dataType: "json",
	    data: {'csrfmiddlewaretoken': document.getElementsByName('csrfmiddlewaretoken')[0].value, 
	    	'lat':data.coords.latitude,
	    	'lng':data.coords.longitude,
	    	'pubName': formValues.pubName
	    	},
	    success: function () {
	      var newAddANewPubSuccesMessage = $('<div id="addANewPubSuccesMessage"></div>')
	      $('#addANewPubForm').hide();
	      $('#addANewPubButton').hide();
	      newAddANewPubSuccesMessage.append('<div align="center"><i style="color:#5CB85C" class="fa fa-check-circle-o fa-5x" aria-hidden="true"></i></div><br/>')
	      newAddANewPubSuccesMessage.append('<p align="center" style="color:#5CB85C"><strong>You have successfully added a new pub! The admins will check it\'s validity, and then it will appear in the system. Thanks :)</strong></p> ');
	      $('#addANewPubSuccesMessage').replaceWith(newAddANewPubSuccesMessage);
	    }
	});
});
}