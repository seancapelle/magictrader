// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// create the Card schema
var CardSchema = new Schema({
  name: {
    type:String
  },
  set: {
    type:String
  },
  price: {
  	type: Number
  }
});

// create the Card model with the CardSchema
var Card = mongoose.model('Card', CardSchema);

// export the Card model
module.exports = Card;