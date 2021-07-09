const express = require('express')
const { protect } = require('../middleware/authMiddleware.js')

const router = express.Router()
const { getMyOrders } = require('../controllers/orderController.js')

router.route('/myorders').get(protect, getMyOrders)

module.exports = router
