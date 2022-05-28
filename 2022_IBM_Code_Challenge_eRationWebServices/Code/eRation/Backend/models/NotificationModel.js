const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },

  content:{
    type: String,
    required: true
  }

});

module.exports = mongoose.model('notifications', NotificationSchema); // 'items' will be the name of the collection where the item data will be stored.
