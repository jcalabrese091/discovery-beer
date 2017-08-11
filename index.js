const express = require('express');
const app = express();
var path= require('path');
var request= require('request');

app.use("/assets", express.static(__dirname + "/assets"));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

app.get('/brewery', function(req, res, next){
	var brewSearch= req.query.search;
	console.log(req);
	request({
		uri: 'http://api.brewerydb.com/v2/search?key=a38ad29245b0fbac1da3559661f40f6e&q=' +brewSearch+ '&type=Brewery',
	}).pipe(res);
});
app.get('/location', function(req, res, next){
	var brewId= req.query.id;
	console.log(req);
	request({
		uri: 'http://api.brewerydb.com/v2/search?key=a38ad29245b0fbac1da3559661f40f6e&q=' +brewSearch+ '&type=Brewery',
	}).pipe(res);
})