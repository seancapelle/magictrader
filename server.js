//Setup
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//Configuration
// Database configuration with mongoose
mongoose.connect('mongodb://localhost/hwscraper');

//Heroku mongoose connection
//mongoose.connect('mongodb://heroku_02s0x6w6:vtp54uth802806jt60jrjjp4ae@ds139267.mlab.com:39267/heroku_02s0x6w6');

//Routes
app.get('/', function(req,res){
	res.send(index.html);
})


app.listen(3000, function(){
	console.log("App listening on port 3000");
});
