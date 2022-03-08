const { Decimal128 } = require('bson');
const mongoose = require('mongoose');

const transactionsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  items: { type: Array },
  total: { type: Number },
  date_created: Date
});

module.exports = mongoose.model('transactions', transactionsSchema);
