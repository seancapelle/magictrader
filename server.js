//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mtg = require('mtgsdk');

var app = express();

app.use(require('connect').bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Configuration
// Database configuration with mongoose
// mongoose.connect('mongodb://localhost/magictrader');

//Heroku mongoose connection
mongoose.connect('mongodb://heroku_02s0x6w6:vtp54uth802806jt60jrjjp4ae@ds139267.mlab.com:39267/heroku_02s0x6w6');

var db = mongoose.connection;

//Show any mongoose errors
db.on('error', function(err){
	console.log('Mongoose Error: ', err);
});

//Log a success message
db.once('open', function(){
	console.log('Mongoose connection successful.');
});

//Bring in Card models
 var Card = require('./server/models/cardModel.js');
 var YourCard = require('./server/models/yourCardModel.js');
 var WantCard = require('./server/models/wantCardModel.js')


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

//DB post for your cards
app.post('/yourCard', function(req,res){

	var yourCard = new YourCard(req.body);

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

//DB post for want cards
app.post('/wantCard', function(req,res){

	var wantCard = new WantCard(req.body);

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

//DB pull for your cards
app.get('/pullYourCards', function(req, res){
	// grab every doc in the Articles array
	YourCard.find({}, function(err, doc){
		// log any errors
		if (err){
			console.log(err);
		} 
		// or send the doc to the browser as a json object
		else {
			res.json(doc);
		}
	});
});

//DB pull for want cards
app.get('/pullWantCards', function(req, res){
	// grab every doc in the Articles array
	WantCard.find({}, function(err, doc){
		// log any errors
		if (err){
			console.log(err);
		} 
		// or send the doc to the browser as a json object
		else {
			res.json(doc);
		}
	});
});

//Remove a your card from DB
app.get('/removeYourCard/:id', function(req, res){

console.log(req.params.id);
	var cardID = req.params.id.toString();

	// YourCard.remove({"_id": cardID}, function(err, result){
	// 	if (err){
	// 		console.log(err);
	// 	}
	// 	else{
	// 		res.redirect('/');
	// 	}
	// })
})

// //Remove a want card from DB
// app.delete('/removeWantCard', function(req, res){
// 	WantCard.
// })

app.listen(3000, function(){
	console.log("App listening on port 3000");
});
