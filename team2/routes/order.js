var express = require('express')
var app = express()
var router = express.Router()
const { fetchAllOrders, addOrders } = require('../controllers/order')
const Order = require('../../models/orders')
const advancedFind = require('../middleware/advancedFind');

router.route('/')
    .get(advancedFind(Order), fetchAllOrders)
    .post(addOrders)

module.exports = router

