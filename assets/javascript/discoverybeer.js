
var params=$.param({search:"piece"})
var queryURL = "/brewery?"+params;

      console.log(queryURL);

      $.ajax({
          url: queryURL,
          method: "GET",
          crossDomain: true
        })

        .done(function(response) {
          	console.log(response);
        	var image= $("<iframe>");
    		image.attr("src", response.proxylink[0]);
    		image.attr("class","iframe");
    		image.attr("width","900px");
    		image.attr("height","600px");
    		console.log(response.proxylink[0]);
   			$("#map").append(image);


});
	var uberClientId = "zb6GeXdmaA_2W_7pLT7-IrYimFqdTUqF";
	var uberServerToken = "jVnChwYG5omuOSFTalKvIno0s5uteYLSqDE0Uo_g";
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
//       $("#selectbrew").on("click", function (event){
//     event.preventDefault();
//     var brew = $("#zipcode").val().trim();
// var params=$.param({search:brew})
// var queryURL = "/brewery?"+params;
//       console.log(queryURL);
//       $.ajax({
//           url: queryURL,
//           method: "GET",
//           crossDomain: true
//         })
//         .done(function(response) {
//             console.log(response);
// });
// })