const express = require('express');
const router = express.Router();

const {
  chocolate_list_lookups,
  get_chocolate_list_lookups
} = require('../controllers/items');

//@ CREATE
router.post('/chocolate-list', chocolate_list_lookups);

//@ LOOKUP
router.get('/chocolate-list', get_chocolate_list_lookups);

module.exports = router;