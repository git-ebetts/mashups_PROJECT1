var riverData = [];
var lakeData = [];

function searchnyRivers(word){
	console.log(word);

	var nyRiversURL = "https://data.ny.gov/resource/jcxg-7gnm.json?fish_spec=" + word;

	$.ajax({
		url: nyRiversURL,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("Oh no!!!! Didn't work...");
		},
		success: function(data){
			console.log("WooHoo!!!");

			riverData = data;
			console.log("The data object");
			console.log(riverData);

		}
	});
}

function searchnyLakes(word){
	console.log(word);
	var nyLakesURL = "https://data.ny.gov/resource/vn2g-zyb7.json?fish_speci=" + word;

	$.ajax({
		url: nyLakesURL,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("Oh no!!!! Didn't work...");
		},
		success: function(data){
			console.log("WooHoo!!!");

			lakeData = data;

			console.log("The data object");
			console.log(lakeData);

			createPage();

		}
	});
}


function createPage() {

console.log(riverData);
console.log(lakeData);

	var theSearchResults = riverData.concat(lakeData);


	console.log("The Number of Results: " + theSearchResults.length);

	var theResultsString = '<ol>';
	for (var i = 0; i < theSearchResults.length; i++){

			// CREATE RESULTS LIST ON PAGE
			theResultsString += '<li>' + "County: " + theSearchResults[i].county + '</li>' +
			'<li>Name: ' + theSearchResults[i].name + '</li>'  +
			'<li> Location: ' + theSearchResults[i].point_x + ', ' + theSearchResults[i].point_y + '</li>' +
			'<li>----------</li>';

			// $('#theResults').append(theResultsString);

			//CREATE MAP POINTS
			var coords = [theSearchResults[i].point_y, theSearchResults[i].point_x];
			console.log(coords);
			// console.log(coords.latitude);
			// console.log(coords.longitude);

			var latLng = new google.maps.LatLng(coords[0],coords[1]);

			/*
			var mapCanvas = document.getElementById('map-canvas');
			var mapOptions = {
				center: new google.maps.LatLng(43.0469, -76.1444),
				zoom: 7,
				mapTypeId: google.maps.MapTypeId.TERRAIN
			};
			var map = new google.maps.Map(mapCanvas, mapOptions);
			*/
			var marker = new google.maps.Marker({
				position:latLng,
				map: theFishingMap
			});

		// console.log(theSearchResults[i]);
		// 
	}

	theResultsString += '</ol>';
	$('#theResults').html(theResultsString);
	
}


$(document).ready(function(){
	console.log("We are ready!");

	//button listener
	$('#theButton').click(function(){

		console.log("CLicked the button!");
		var searchTerm = $('#theInput').val();
		console.log(searchTerm);

		//function to make api request
		searchnyRivers(searchTerm);
		searchnyLakes(searchTerm);
	});
});


console.log("Not ready!");

//Global var for our map
var theFishingMap;

function makeTheMap() {
	var mapCanvas = document.getElementById('map-canvas');
	var mapOptions = {
		center: new google.maps.LatLng(43.0469, -76.1444),
		zoom: 7,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};
	theFishingMap = new google.maps.Map(mapCanvas, mapOptions);
}

google.maps.event.addDomListener(window, 'load', makeTheMap);

