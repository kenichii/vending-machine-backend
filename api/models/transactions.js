const { Decimal128 } = require('bson');
const mongoose = require('mongoose');

const transactionsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  item: { type: Object },
  total: { type: String },
  customerCash: { type: String },
  cash: { type: String },
  date_created: Date
});

module.exports = mongoose.model('transactions', transactionsSchema);
