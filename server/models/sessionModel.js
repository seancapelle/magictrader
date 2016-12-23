// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// create the Card schema
var SessionSchema = new Schema({
    name: String
});

// create the User model with the UserSchema
var Session = mongoose.model('Session', SessionSchema);

// export the User model
module.exports = Session;
