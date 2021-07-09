const Orders = require('../../models/orders')
const asyncHandler = require('../middleware/async');
const CartItem = require("../../models/cartlist");


const fetchAllOrders = asyncHandler(async (req, res, next) => {
    res.json(res.advancedResults);
})


const addOrders = asyncHandler(async (req, res, next) => {
    try {
        const emptyCart = await CartItem.updateMany({ email: req.body.email }, { $set: { books: [] } }, { new: true, multi: true });
        const orderData = {
            books: req.body.books,
            address: req.body.address[0],
            amount: req.body.amount,
            email: req.body.email
        }


        let orderRes = await Orders.create(orderData);
        res.status(201).json({ success: true });
    }
    catch (error) {
        res.status(400).send(error)
    }
});


module.exports = { fetchAllOrders, addOrders }