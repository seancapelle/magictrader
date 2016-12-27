// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// create the YourCard schema
var YourCardSchema = new Schema({
    session: String,
    name: String,
    lowPrice: String,
    highPrice: String,
    avgPrice: String,
    foilPrice: String,
    price: String,
    pic: String
});

// create the Card model with the CardSchema
var YourCard = mongoose.model('YourCard', YourCardSchema);

// export the Card model
module.exports = YourCard;
