const express = require('express');
const router = express.Router();
const {addOrder, updateOrderById, fetchAllOrders,getOrderCount,ordersCount,DaywiseOrderCount } = require('../controllers/orders');
const { protect, authorize } = require('../../middleware/auth');
var advancedFind = require('../middleware/Advancedfind');
const Orders = require('../../models/orders');



router.route('/')
    .get(protect,authorize('admin'), advancedFind(Orders), fetchAllOrders)
    .post(/*protect, authorize(),*/ addOrder)
  
router.route('/:_id')
    .patch(protect, authorize('admin'), updateOrderById);

router.route('/count')
    .get(protect,authorize('admin'), getOrderCount)

router.route('/piecount')
    .get(ordersCount)

router.route('/chartData')
    .get(DaywiseOrderCount)

module.exports = router;