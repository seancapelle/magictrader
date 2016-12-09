// require mongoose
var mongoose = require('mongoose');
// // create a schema class
// var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

// create the user schema
var userSchema = mongoose.Schema({
  local: {
  	// name:String,
  	email: String,
  	password: String
  }
 
  
});

// Generate a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
}
// create the user model with the userSchema
module.exports = mongoose.model('User', userSchema);

