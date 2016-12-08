//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mtg = require('mtgsdk');
var sessions = require('client-sessions');

var app = express();

app.use(require('connect').bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Configuration

app.use(sessions({
    cookieName: 'tradeSession',
    secret: 'FblthpIsNotT0tallyLost!',
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
}));

app.post('/login', function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(!user){
            //If the user isn't in the DB, reset the session info and redirect
            res.render('login.jade', {error: 'Invalid email or password.'});
        }
        else{
            if(req.body.password === user.password){
                req.session.user = user;
                res.redirect('/dashboard');
            }
            else{
                res.render('login.jade', {error: 'Invalid email or password.'});
            }
        }
    })
})

// app.get('/dashboard', function(req, res){
//     if(req.session && req.session.user){
//         User.findOne({ email: req.session.user.email }, function (err, user){
//             if(!user){
//                 req.session.reset();
//                 res.redirect('/login');
//             }
//             else{
//                 //expose the user to the template
//                 res.locals.user = user;

//                 //render the dashboard page
//                 res.render('dashboard.jade');
//             }
//         });
//     }
//     else{
//         res.redirect('/login');
//     }
// })

app.use(function(req, res, next){
    if (req.session && req.session.user){
        User.findOne({ email: req.session.user.email }, function(err, user){
            if (user) {
                req.user = user;
                delete req.user.password;
                req.session.user = user;
                res.locals.user = user;
            }
            // Finish processing the middleware and run the route
            next();
        });
    }
    else {
        next();
    }
});

function requireLogin (req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    }
    else {
        next();
    }
};

app.get('/dashboard', requireLogin, function(req, res){
    res.render('dashboard.jade');
});

app.get('/logout', function(req, res) {
    req.session.reset();
    res.redirect('/');
});

// Database configuration with mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/magictrader');

//Heroku mongoose connection
// mongoose.connect('mongodb://heroku_9th412f2:d5m3l5eb9tk70o42g958nekufn@ds119598.mlab.com:19598/heroku_9th412f2');

var db = mongoose.connection;

//Show any mongoose errors
db.on('error', function(err) {
    console.log('Mongoose Error: ', err);
});

//Log a success message
db.once('open', function() {
    console.log('Mongoose connection successful.');
});

//Bring in Card models
var Card = require('./server/models/cardModel.js');
var YourCard = require('./server/models/yourCardModel.js');
var WantCard = require('./server/models/wantCardModel.js')


//Routes
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.use('/', express.static(__dirname + '/public'));

//Card search route
app.post('/search', function(req, res) {

    //Grab card by name and set (optional)
    mtg.card.all({ name: req.body.name, set: req.body.set })
        .on('data', function(card) {
            res.send(card);
        });
})

//DB post for your cards
app.post('/yourCard', function(req, res) {

    var yourCard = new YourCard(req.body);

    yourCard.save(function(err, doc) {
        // send any errors to the browser
        if (err) {
            res.send(err);
        }
        // otherwise, send the new doc to the browser
        else {

            YourCard.find({}, function(err, doc) {
                // log any errors
                if (err) {
                    console.log(err);
                }
                // or send the doc to the browser as a json object
                else {
                    res.json(doc);
                }
            })
        }
    })
})

//DB post for want cards
app.post('/wantCard', function(req, res) {

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
app.get('/pullYourCards', function(req, res) {
    // grab every doc in the Articles array
    YourCard.find({}, function(err, doc) {
        // log any errors
        if (err) {
            console.log(err);
        }
        // or send the doc to the browser as a json object
        else {
            res.json(doc);
        }
    });
});

//DB pull for want cards
app.get('/pullWantCards', function(req, res) {
    // grab every doc in the Articles array
    WantCard.find({}, function(err, doc) {
        // log any errors
        if (err) {
            console.log(err);
        }
        // or send the doc to the browser as a json object
        else {
            res.json(doc);
        }
    });
});

//Remove a your card from DB
app.delete('/removeYourCard/:id', function(req, res) {

    var split = req.params.id.split(':');

    var cardID = split[1];

    YourCard.findByIdAndRemove(cardID, function(err, res) {
        if (err) {
            console.log(err);
        }
    })
    res.json({
        message: 'Removed yourCard',
        status: false
    })
})

//Remove a want card from DB
app.delete('/removeWantCard/:id', function(req, res) {

    var split = req.params.id.split(':');

    var cardID = split[1];

    WantCard.findByIdAndRemove(cardID, function(err, res) {
        if (err) {
            console.log(err);
        }
    })
    res.json({
        message: 'Removed wantCard',
        status: false
    })
})
var port = Number(process.env.PORT || 3000);

app.listen(port, function() {
    console.log("App listening on port " + port);
});
