//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mtg = require('mtgsdk');

//Angular local storage
// var ngstorage = require('ngstorage');

var app = express();

app.use(require('connect').bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Configuration
// Database configuration with mongoose
mongoose.connect('mongodb://localhost/magictrader');

//Heroku mongoose connection
//mongoose.connect('mongodb://heroku_02s0x6w6:vtp54uth802806jt60jrjjp4ae@ds139267.mlab.com:39267/heroku_02s0x6w6');

var db = mongoose.connection;

//Show any mongoose errors
db.on('error', function(err){
	console.log('Mongoose Error: ', err);
});

//Log a success message
db.once('open', function(){
	console.log('Mongoose connection successful.');
});


//Routes
app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
})

app.use('/', express.static(__dirname + '/public'));

//Card search route
app.post('/search', function(req,res){

	//Grab card by name and set (optional)
	mtg.card.all({ name: req.body.name, set: req.body.set})
	.on('data', function (card) {
	    res.send(card);
	});
})

//Database post for your cards
app.post('/yourCard', function(req,res){

	console.log("On Your route");

	var yourCard = new Card(req.body);

	yourCard.save(function(err, doc) {
	    // send any errors to the browser
	    if (err) {
	      res.send(err);
	    }
	    // otherwise, send the new doc to the browser
	    else {
	      res.send(doc);
	    }
	})    
})

//Database post for want cards
app.post('/wantCard', function(req,res){

	var wantCard = new Card(req.body);

	wantCard.save(function(err, doc) {
	    // send any errors to the browser
	    if (err) {
	      res.send(err);
	    }
	    // otherwise, send the new doc to the browser
	    else {
	      res.send(doc);
	    }
	})
})


app.listen(3000, function(){
	console.log("App listening on port 3000");
});
