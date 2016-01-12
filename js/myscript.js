$(function(){

'use strict'

function loadData() {
	$.ajax({
		url: 'http://foundationphp.com/phpclinic/podata.php?&raw&callback=?',
		jsonpCallback: 'jsonReturnData',
		dataType: 'jsonp',
			data: {
				startDate:'20150301',
				endDate: '20150302',
				format: 'json'
			},
			success: function(response) {
				console.log(response);
			} // success

		}); // $.ajax call
	} // end of load function

loadData();	

}); //end of JQuery document ready