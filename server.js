//Setup
var express = require('express');

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');


var mtg = require('mtgsdk');

// var jsonParser = bodyParser.json();

// BodyParser makes it easy for our server to interpret data sent to it.
// The code below is pretty standard.
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//    extended: true
// }));

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


app.post('/test', function(req,res){

console.log(req.body);
console.log(req.body.name);


	
// 	// Get all cards
// mtg.card.all()
// .on('data', function (card) {
//   console.log(card.name)
// });

// // Filter Cards
// mtg.card.all({ supertypes: 'legendary', types: 'creature', colors: 'red,white' })
// .on('data', function (card) {
//     console.log(card.name)
// });

// Filter Cards
mtg.card.all({ name: '"' + req.body.name + '"'})
.on('data', function (card) {
    res.send(card);
    // console.log(card.name + " " + card.setName + " " + card.multiverseid);
});

// // Get cards on a specific page / pageSize
// mtg.card.where({ page: 50, pageSize: 50})
// .then(cards => {
//     console.log(cards[0].name)
// })

})


app.listen(3000, function(){
	console.log("App listening on port 3000");
});
