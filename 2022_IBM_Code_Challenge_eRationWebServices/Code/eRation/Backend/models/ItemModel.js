const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },

  quantity:{
    type: Number,
    required: true
  },

  unit:{
    type: String,
    enum: ['KG', 'liters', 'Pcs'],
    required : true
  },

  price:{
    type: Number,
    required:true
  }

});

module.exports = mongoose.model('items', ItemSchema); // 'items' will be the name of the collection where the item data will be stored.
