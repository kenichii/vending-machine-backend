const { Decimal128 } = require('bson');
const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  price: { type: Number },
  stocks: { type: Number }
});

module.exports = mongoose.model('items', itemsSchema);
