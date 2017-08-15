//<-----------------------------------Google Maps---------------------------------------------->
var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6,
        });
        infoWindow = new google.maps.InfoWindow;
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Your Location');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/geocode/json?address=oggis&key=AIzaSyA8M_UKrxmceM1lc2jBdbX-7AgDCKUlJtg";
    document.getElementsByTagName('head')[0].appendChild(script);
    window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
      };

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
});