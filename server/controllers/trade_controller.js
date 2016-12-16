// Dependencies
var express = require('express');
var router = express.Router();
var path = require('path');
var mtg = require('mtgsdk');

//Bring in DB models
var Card = require('../models/cardModel.js');
var YourCard = require('../models/yourCardModel.js');
var WantCard = require('../models/wantCardModel.js')
var Session = require('../models/sessionModel.js');

var url = path.join(__dirname, '../../public/views', 'index.html');
//Routes

// Original
// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// })
module.exports = function(app) {



    // app.get('/', function(req, res) {

    //   var session = new Session();

    //   session.save(function(err, doc) {
    //     if (err) {
    //       res.send(err);
    //     } else {

    //       // res.sendFile(__dirname + '/index.html');
    //       res.sendFile(path.join(__dirname, '../../public/views', 'index.html'));

    //       var sessionID = doc._id;

    //       console.log(sessionID);

    //       // localStorage.setItem('Session', sessionID);
    //     }
    //   })
    // })


    //Card search route
    app.post('/search', function(req, res) {

      //Grab card by name and set (optional)
      mtg.card.all({
          name: req.body.name,
          set: req.body.set
        })
        .on('data', function(card) {

          res.send(card);

        });
    })

    //DB post for your cards
    app.post('/yourCard', function(req, res) {

      var yourCard = new YourCard(req.body);
      console.log(req.body)

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
  }
  // module.exports = router;