const asyncHandler = require('express-async-handler')
const Order = require('../../models/orders')

const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ email: req.user.email })
	res.json(orders)
})

module.exports = { getMyOrders }
