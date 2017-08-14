const express = require('express');
const app = express();
var path= require('path');
var request= require('request');
var xml2js= require('xml2js');
var parser = new xml2js.Parser();

app.use("/assets", express.static(__dirname + "/assets"));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
app.get('/brewery', function(req, res, next){
	var brewSearch= req.query.search;
	console.log(req);
	request({
		uri: 'http://beermapping.com/webservice/locquery/a3a84df2963679addec260dee07c9f16/'+brewSearch,
	},
  function afterRequestIsDone(error, response, body) {
  	if (error) {
      return console.error('upload failed:', error);
    }
    console.log('Upload successful!  Server responded with:', body);
    console.log(response);
  
  	parser.parseString(body, function afterParseIsDone(err, result) {
        console.dir(result);
        console.log('Done');
        // // var jsonResult = JSON.stringify(result);
        // console.log(jsonResult);
        res.send(result.bmp_locations.location[0]);
    });
    
   });
  
});

// app.get('/brewery', function(req, res, next){
// 	var brewSearch= req.query.search;
// 	console.log(req);
// 	request({
// 		uri: 'http://api.brewerydb.com/v2/search?key=a38ad29245b0fbac1da3559661f40f6e&q=' +brewSearch+ '&type=Brewery',
// 	}).pipe(res);
// });
// app.get('/location', function(req, res, next){
// 	var brewId= req.query.id;
// 	console.log(req);
// 	request({
// 		uri: 'http://api.brewerydb.com/v2/search?key=a38ad29245b0fbac1da3559661f40f6e&q=' +brewSearch+ '&type=Brewery',
// 	}).pipe(res);
// });