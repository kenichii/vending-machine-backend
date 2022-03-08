const mongoose = require('mongoose');
const ItemsModel = require('../models/items');
const {isEmpty} = require('lodash');

exports.chocolate_list_lookups = async (req, res) => {
  const cleanBody = {
    name: req.body.name,
    price: req.body.price,
    stocks: req.body.stocks
  };

  try {

    const isExisting = await ItemsModel.findOne({name: cleanBody.name});
    let result;

    if(isEmpty(isExisting)){
      const addItem = new ItemsModel({
        _id: new mongoose.Types.ObjectId(),
        ...cleanBody
      })
      result = await addItem.save();
    } else {
      const stocks = isExisting.stocks += cleanBody.stocks;
      const price = isExisting.price = cleanBody.price;
      result = await ItemsModel.findOneAndUpdate({_id: isExisting._id }, { $set: {stocks, price }}, {new: true})
    }

    res.status(201).json({
      status: "success",
      message: 'Added Successful.',
      result: result
    })
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e
    })
  }
}

exports.get_chocolate_list_lookups = async (req, res) => {
  const findQuery = {};
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page ? ((parseInt(req.query.page)) - 1) * limit : 0;
  const name = req.query.name;

  if(!isEmpty(name)){
    findQuery.name = {$regex: new RegExp(".*" + name + ".*", "i")}
  }

  try {
    console.log(findQuery, "findQuery")
    console.log(page, "page")
    console.log(limit, "limit")

      const count = await ItemsModel.count(findQuery);
      const data = await ItemsModel.find(findQuery)
        .skip(page)
        .limit(limit);
        console.log(data)

      const result = {
          count,
          total_pages: parseInt(Math.ceil((count/limit))),
          data
      }

      if(isEmpty(data)){
          res.status(401).json({
              status: "error",
              message: "No data found"
          });
      }

      res.status(201).json({
          status: "success",
          message: 'Fetch Successful.',
          result: result
      })
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: err
      })
  }
}

exports.get_available_currency = async (req, res) => {
  try {
    res.status(201).json({
        status: "success",
        message: 'Fetch Successful.',
        result: ["c", "$"]
    })
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: err
      })
  }
}