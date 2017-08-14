
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

});
