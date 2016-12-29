//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

// var mtg = require('mtgsdk');

// var passport = require('passport');
// var flash = require('connect-flash');
// var cookieParser = require('cookie-parser');
var session = require('express-session');
// var configDB = require('./server/config/database.js')

// var sessions = require('client-sessions');


// var FileStore = require('session-file-store')//(session);

var router = express.Router();

var app = express();

// app.use(require('connect'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(morgan('dev'));
// app.use(cookieParser());
app.use(bodyParser());
app.use(flash());
// app.set('views', __dirname + '/public/views');
// app.set('view engine', 'ejs');


// // Required for passport
app.use(session({ secret: 'FblthpIsNotT0tallyLost!' }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// require('./server/routes/routes.js')(app, passport);
// require('./server/config/passport')(passport);

//Configuration

// app.use(sessions({
//     cookieName: 'tradeSession',
//     secret: 'FblthpIsNotT0tallyLost!',
//     duration: 24 * 60 * 60 * 1000,
//     activeDuration: 1000 * 60 * 5
// }));

// app.use(session({
//     name: 'MagicTrader',
//     secret: 'FblthpIsNotT0tallyLost!',
//     resave: true,
//     saveUninitialized: true,
//     duration: 30 * 60 * 1000,
//     activeDuration: 5 * 60 * 1000,
//     httpOnly: true,
//     secure: true,
//     ephemeral: true,
//     // store: new FileStore()
// }))

// app.post('/login', function(req, res){
//     User.findOne({email: req.body.email}, function(err, user){
//         if(!user){
//             //If the user isn't in the DB, reset the session info and redirect
//             res.render('login.jade', {error: 'Invalid email or password.'});
//         }
//         else{
//             if(req.body.password === user.password){
//                 req.session.user = user;
//                 res.redirect('/dashboard');
//             }
//             else{
//                 res.render('login.jade', {error: 'Invalid email or password.'});
//             }
//         }
//     })
// })

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

// app.use(function(req, res, next){
//     if (req.session && req.session.user){
//         User.findOne({ email: req.session.user.email }, function(err, user){
//             if (user) {
//                 req.user = user;
//                 delete req.user.password;
//                 req.session.user = user;
//                 res.locals.user = user;
//             }
//             // Finish processing the middleware and run the route
//             next();
//         });
//     }
//     else {
//         next();
//     }
// });

// function requireLogin (req, res, next) {
//     if (!req.user) {
//         res.redirect('/login');
//     }
//     else {
//         next();
//     }
// };

// app.get('/dashboard', requireLogin, function(req, res){
//     res.render('dashboard.jade');
// });

// app.get('/logout', function(req, res) {
//     req.session.reset();
//     res.redirect('/');
// });

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


// //Routes
// // Original
// // app.get('/', function(req, res) {
// //     res.sendFile(__dirname + '/index.html');
// // })
// router.get('/', function(req, res) {

//     var session = new Session();

//     session.save(function(err, doc) {
//         if (err) {
//             res.send(err);
//         } else {
//             res.sendFile(__dirname + '/index.html');

//             var sessionID = doc._id;

//             console.log(sessionID);

//             // localStorage.setItem('Session', sessionID);
//         }
//     })
// })


app.use(express.static(__dirname + '/public'));


var routes = require('./server/routes/routes.js')(app);
var APIroutes = require('./server/controllers/trade_controller.js')(app);

// app.use('/', routes);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("App listening on port " + PORT);
});