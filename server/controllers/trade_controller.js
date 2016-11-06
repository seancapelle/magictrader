var express = require('express');
var router = express.Router();
var trade = require('../models/trade.js');

//Routes
app.get('/', function(req,res){
	res.redirect('/index');
})

app.get('/index', function(req,res){
	res.render('index');
})
