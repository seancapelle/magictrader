// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// create the WantCard schema
var WantCardSchema = new Schema({
    name: String,
    lowPrice: String,
    highPrice: String,
    avgPrice: String,
    pic: String
});

// create the WantCard model with the CardSchema
var WantCard = mongoose.model('WantCard', WantCardSchema);

// export the Card model
module.exports = WantCard;
