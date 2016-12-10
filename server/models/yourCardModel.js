// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// create the YourCard schema
var YourCardSchema = new Schema({
    name: String,
    lowPrice: String,
    highPrice: String,
    avgPrice: String,
    pic: String
});

// create the Card model with the CardSchema
var YourCard = mongoose.model('YourCard', YourCardSchema);

// export the Card model
module.exports = YourCard;
