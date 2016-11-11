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
	      var newAddANewPubSuccesMessage = $('<div id="addANewPubSuccesMessage"></div>')
	      $('#addANewPubForm').hide();
	      $('#addANewPubButton').hide();
	      newAddANewPubSuccesMessage.append('<div align="center"><i style="color:#5CB85C" class="fa fa-check-circle-o fa-5x" aria-hidden="true"></i></div><br/>')
	      newAddANewPubSuccesMessage.append('<p style="color:#5CB85C"><strong>You have successfully added a new pub! The admins will check it\'s validity, and then it will appear in the system. Thanks :)</strong></p> ');
	      $('#addANewPubSuccesMessage').replaceWith(newAddANewPubSuccesMessage);
	    }
	});	

});
}