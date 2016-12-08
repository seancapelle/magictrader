// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// create the Card schema
var UserSchema = new Schema({
  name:String,
  email: String,
  password: String
});

// create the User model with the UserSchema
var User = mongoose.model('User', UserSchema);

// export the User model
module.exports = User;