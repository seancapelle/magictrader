// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// create the Card schema
var CardSchema = new Schema({
  name:String,
  price: String,
  pic : String
});

// create the Card model with the CardSchema
var Card = mongoose.model('Card', CardSchema);

// export the Card model
module.exports = Card;