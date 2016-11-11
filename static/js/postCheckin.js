function postCheckin(key, name)
{
	console.log("postcheckin key: "+String(key)+name);
	$.ajax({
		type: 'POST',
	    url: "/post_checkin/",
	    dataType: "json",
	    data: {
	    	'csrfmiddlewaretoken': document.getElementsByName('csrfmiddlewaretoken')[0].value,
	    	'pubName': name,
	    	'pk': key
	    	},
	    success: function () {
	      var newCheckinSuccesMessage = $('<div id="checkinSuccesMessage"></div>')
	      $('#checkinList').hide();
	      $('#checkinTitle').hide();
	      newCheckinSuccesMessage.append('<div align="center"><i style="color:#5CB85C" class="fa fa-check-circle-o fa-5x" aria-hidden="true"></i></div><br/>')
	      newCheckinSuccesMessage.append('<p style="color:#5CB85C" align="center"><strong>You have successfully checked in to '+name+'.</strong></p> ');
	      $('#checkinSuccesMessage').replaceWith(newCheckinSuccesMessage);
	    }
	});
}