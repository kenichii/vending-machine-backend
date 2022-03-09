const mongoose = require('mongoose');
const TransactionsModel = require('../models/transactions');
const ItemsModel = require('../models/items');

const ResponseHandler = require('../services/success-error-handling')

const validatePayload = ({ items }) => {
 return items.reduce((total, item) => total + (item.price * item.total), 0);
}

const computeChange = (cleanBody, totalPrice) => {

  try {
    let total = parseFloat(cleanBody.cash).toFixed(2) - totalPrice;

    if(total < 0){
      throw {
        http_code: 400,
        error_code: "CASH_INSUFFICIENT",
        message: "Cash is insufficient."
      }
    }

    return parseFloat(total).toFixed(2)
  } catch(error) {
    throw error
  }
}

process_payment = async (req, res) => {
  // for multiple items
  // const cleanBody = {
  //   cash: req.body.cash,
  //   items: req.body.items
  // };

  console.log(req.body, "req body")

  const cleanBody = {
    cash: req.body.cash,
    item: req.body.item
  };

  try {

    //const totalPrice = validatePayload(cleanBody);
    let result = computeChange(cleanBody, cleanBody.item.price);

    const generateTransactionHistory = {
      _id: new mongoose.Types.ObjectId(),
      item: cleanBody.item,
      customerCash: `$${cleanBody.cash}`,
      change: `$${result}`,
      total: `$${cleanBody.item.price}`
    };

    let processHistory = new TransactionsModel(generateTransactionHistory);

    await processHistory.save();

    await ItemsModel.findOneAndUpdate({ _id: cleanBody.item._id }, { $set: { stocks: cleanBody.item.stocks - 1} })

    res.status(201).json({
      status: "success",
      message: 'Added Successful.',
      result: result
    })

   // ResponseHandler.successResponseHandler((res, 'Added Successful.', result === 0 ? "Successfully processed" : `Successfully processed, your change is ${result}`))
  } catch (error) {
    ResponseHandler.errorResponseHandler(res, error)
  }
}
const paymentServices = {
  process_payment,
  validatePayload,
  computeChange
};

module.exports = paymentServices