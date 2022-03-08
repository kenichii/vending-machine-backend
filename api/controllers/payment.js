const mongoose = require('mongoose');
const TransactionsModel = require('../models/transactions');
const ResponseHandler = require('../services/success-error-handling')

const validatePayload = ({ items }) => {
 return items.reduce((total, item) => total + (item.price * item.total), 0);
}

const computeChange = (cleanBody, totalPrice) => {

  try {
    let total = cleanBody.cash - totalPrice;

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
  const cleanBody = {
    cash: req.body.cash,
    items: req.body.items
  };

  try {

    const totalPrice = validatePayload(cleanBody);

    let result = computeChange(cleanBody, totalPrice);

    const generateTransactionHistory = {
      _id: new mongoose.Types.ObjectId(),
      items: cleanBody.items,
      total: `$${totalPrice}`
    };

    let processHistory = new TransactionsModel(generateTransactionHistory);

    await processHistory.save();

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