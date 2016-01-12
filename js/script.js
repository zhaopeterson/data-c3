$(function(){
console.log("try to change color")
"use strict"
var fromDate,
	endDate;
// http://c3js.org/samples/data_color.html
	function getMean(array) {
		var mean = array.reduce(function(a,b) {
			return a + b;
		})/array.length;
		return mean.toFixed(2);
	}

	function getMedian(array) {
		var median;
		var sorted = array.sort(function(a, b){return a-b});
		var middleIndex = Math.floor(sorted.length/2);
		if (sorted.length % 2 == 0) {
			median = (sorted[middleIndex] + sorted[middleIndex -1])/2;
		} else {
			median = sorted[middleIndex];
		}
		return median.toFixed();
	}

	function generateChart(data){
		var chart = c3.generate({
			data: {
				x: "x",
				columns: data,
				type: "bar"
			},
        	color: {
				pattern: ["#1f1d28", "#5b6e86", "#d49f1f", "#cde603", "#9b1223", "#e47994"]
        	},
			axis: {
				x: {
					type: "timeseries",
					tick: {
						format: "%Y-%m-%d"
					}
				}
			},//axis
			subchart: {
				show: true
			}
		}) //chart
	} // generateChart

	function processData(data) {
		var poData = [];

		var Dates = ["x"],
			meanTemps = ["Mean Temperature"],
			medTemps = ["Median Temperature"],
			meanPress = ["Mean Pressure"],
			medPress = ["Median Pressure"],
			meanSpeeds = ["Mean Speed"],
			medSpeeds = ["Median Speed"];

		for (var key in data) {
			if(data.hasOwnProperty(key)) {
				if ((data[key].t !== null) && (data[key].p !== null) && (data[key].s !== null)) {
					Dates.push(key);
					meanTemps.push(getMean(data[key].t));
					medTemps.push(getMedian(data[key].t));
					meanPress.push(getMean(data[key].p));
					medPress.push(getMedian(data[key].p));
					meanSpeeds.push(getMean(data[key].s));
					medSpeeds.push(getMedian(data[key].s));
				}
			}
		}
		poData.push(Dates, meanTemps, medTemps, meanPress, medPress, meanSpeeds, medSpeeds);
		return poData;
	}

	function loadData() {
		$.ajax({
			url: "http://foundationphp.com/phpclinic/podata.php?&raw&callback=?",
			jsonpCallback: "jsonReturnData",
			dataType: "jsonp",
				data: {
					startDate: formatDate(fromDate, ""),
					endDate: formatDate(endDate, ""),
					format: "json"
				},
				success: function(res) {
					generateChart(processData(res));
				} // success
			}); // $.ajax call
		} // end of load function

	function formatDate(date, divider) {
		var someday = new Date(date),
			month = (someday.getUTCMonth() + 1) <=9 ? "0" + (someday.getUTCMonth() + 1): (someday.getUTCMonth() + 1),
			day = someday.getUTCDate() <=9 ? "0"+someday.getUTCDate(): someday.getUTCDate(),
			year = someday.getUTCFullYear();
			return ("" + year + divider + month + divider + day);
	}

	fromDate = new Date();
	fromDate.setDate(fromDate.getDate() - 31);

	endDate = new Date();
	endDate.setDate(fromDate.getDate() - 1);

	document.forms.rangeform.from.value = formatDate(fromDate, "-");
	document.forms.rangeform.to.value = formatDate(endDate, "-")

	loadData();

	document.forms.rangeform.addEventListener("change", function(e){
		fromDate = new Date(document.rangeform.from.value);
		endDate = new Date(document.rangeform.to.value);
		fromDate = fromDate.toUTCString();
		endDate = endDate.toUTCString();

		loadData();
	}, false)

}); //end of JQuery document ready