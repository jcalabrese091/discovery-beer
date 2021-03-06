var map;
     var infowindow;
     function initMap() {
       var penguin = {lat: 33.8121, lng: -117.9190}
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 33.8121, lng: -117.9190},
         zoom: 15
       });
       infowindow = new google.maps.InfoWindow;
       var service = new google.maps.places.PlacesService(map);
       service.nearbySearch({
         location: penguin,
         radius: 500,
         type: ['bar']
       }, callback);
     }
     function callback(results, status) {
       if (status === google.maps.places.PlacesServiceStatus.OK) {
         for (var i = 0; i < results.length; i++) {
           createMarker(results[i]);
         }
       }
     }
     function createMarker(place) {
       var placeLoc = place.geometry.location;
       var marker = new google.maps.Marker({
         map: map,
         position: place.geometry.location
       });
        google.maps.event.addListener(marker, 'click', function() {
         infowindow.setContent(place.name);
         infowindow.open(map, this);
       });
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
           var pos = {
             lat: position.coords.latitude,
             lng: position.coords.longitude
           };
           infowindow.setPosition(pos);
           infowindow.setContent('Location found.');
           infowindow.open(map);
           map.setCenter(pos);
         }, function() {
           handleLocationError(true, infoWindow, map.getCenter());
         });
       } else {
         // Browser doesn't support Geolocation
         handleLocationError(false, infoWindow, map.getCenter());
       }
       var geocoder = new google.maps.Geocoder();
       document.getElementById('submit').addEventListener('click', function() {
         geocodeAddress(geocoder, map);
       });
     }
     function geocodeAddress(geocoder, resultsMap) {
       var address = document.getElementById('address').value;
       geocoder.geocode({'address': address}, function(results, status) {
         if (status === 'OK') {
           resultsMap.setCenter(results[0].geometry.location);
           penguin = results[0].geometry.location;
           var marker = new google.maps.Marker({
             map: resultsMap,
             position: results[0].geometry.location,
           });
         } else {
           alert('Geocode was not successful for the following reason: ' + status);
         }
       });
     }


    // var script = document.createElement('script');
    // script.src = "https://maps.googleapis.com/maps/api/geocode/json?address=oggi's&key=AIzaSyA8M_UKrxmceM1lc2jBdbX-7AgDCKUlJtg";
    // document.getElementsByTagName('head')[0].appendChild(script);
    // window.eqfeed_callback = function(results) {
    //     for (var i = 0; i < results.length; i++) {
    //       var coords = results.geometry.location;
    //       console.log(coords);
    //       var latLng = new google.maps.LatLng(coords[1],coords[0]);
    //       var marker = new google.maps.Marker({
    //         position: latLng,
    //         map: map
    //       });
    //     }
    //   };

//<-----------------------------------Uber---------------------------------------------->


var uberClientId = "zb6GeXdmaA_2W_7pLT7-IrYimFqdTUqF";
	var uberServerToken = "4PXVVIxPxZWsKpvoDwJybCrn7UFd-NsrfncFxpCz";
        // create placeholder variables
        var userLatitude
      , userLongitude
      , partyLatitude = 33.652751
      , partyLongitude = -117.846660;


    navigator.geolocation.watchPosition(function(position) {
        // Update latitude and longitude
        console.log(position);
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;
        // Query Uber API if needed
        getEstimatesForUserLocation(userLatitude, userLongitude);
    });
    function getEstimatesForUserLocation(latitude,longitude) {
      $.ajax({
        url: "https://api.uber.com/v1/estimates/price",
        headers: {
            Authorization: "Token " + uberServerToken
        },
        data: {
            start_latitude: latitude,
            start_longitude: longitude,
            end_latitude: partyLatitude,
            end_longitude: partyLongitude
        },
        success: function(result) {
            console.log(result);
            var data = result["prices"];
		  if (typeof data != typeof undefined) {
		  // Sort Uber products by time to the user's location
		  data.sort(function(t0, t1) {
		    return t0.duration - t1.duration;
		  });
		  // Update the Uber button with the shortest time
		  var shortest = data[0];
		  if (typeof shortest != typeof undefined) {
		    console.log("Updating time estimate...");
		    $("#time").html("IN " + Math.ceil(shortest.duration / 60.0) + " MIN");
	  		}
			}
        }
      });
    };

    
  $("a").click(function(event){
      // Redirect to Uber API via deep-linking to the mobile web-app
      var uberURL = "https://m.uber.com/sign-up?";
      // Add parameters
      uberURL += "client_id=" + uberClientId;
      if (typeof userLatitude != typeof undefined) uberURL += "&" + "pickup_latitude=" + userLatitude;
      if (typeof userLongitude != typeof undefined) uberURL += "&" + "pickup_longitude=" + userLongitude;
      uberURL += "&" + "dropoff_latitude=" + partyLatitude;
      uberURL += "&" + "dropoff_longitude=" + partyLongitude;
      uberURL += "&" + "dropoff_nickname=" + "Brewery";
      // Redirect to Uber
      window.location.href = uberURL;
      });

//<-----------------------------------Search---------------------------------------------->
 
 $("#selectbrew").on("click", function (event){
    event.preventDefault();
var brew = $("#zipcode").val().trim()
var params=$.param({search:brew})
var queryURL = "/brewery?"+params;

      console.log(queryURL);

      $.ajax({
          url: queryURL,
          method: "GET",
          crossDomain: true
        })

        .done(function(response) {
          	console.log(response)

		});
		var googleUrl= "https://maps.googleapis.com/maps/api/geocode/json?address="+brew+ "&key=AIzaSyA8M_UKrxmceM1lc2jBdbX-7AgDCKUlJtg"
        	$.ajax({
          	url: googleUrl,
          	method: "GET",
        	})

        	.done(function(response) {
          		console.log(response);


          	});
    //       var script = document.createElement('script');
    // script.src = "https://maps.googleapis.com/maps/api/geocode/json?address="+brew+"&key=AIzaSyA8M_UKrxmceM1lc2jBdbX-7AgDCKUlJtg";
    // document.getElementsByTagName('head')[0].appendChild(script);
    // window.eqfeed_callback = function(results) {
    //     for (var i = 0; i < results.length; i++) {
    //       var coords = results[i].geometry.location;
    //       console.log(coords);
    //       var latLng = new google.maps.LatLng(coords[1],coords[0]);
    //       var marker = new google.maps.Marker({
    //         position: latLng,
    //         map: map
    //       });
      //   }
      // };

});