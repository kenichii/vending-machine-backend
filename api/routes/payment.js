const express = require('express');
const router = express.Router();

const {
  process_payment
} = require('../controllers/payment');

//@ CREATE
router.post('/process', process_payment);

module.exports = router;