var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name:String,
  email:String,
  token:String,
  google_id:String,
  isAdmin: Boolean

});

module.exports = mongoose.model('User',userSchema);
