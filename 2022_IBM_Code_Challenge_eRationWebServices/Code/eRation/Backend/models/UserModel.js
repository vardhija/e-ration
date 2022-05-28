const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },

  rationId:{
    type: String,
    required: true
  },

  email:{
    type: String,
    required: true
  },

  password:{
    type: String,
    required: true
  }

});

module.exports = mongoose.model('users', UserSchema);
