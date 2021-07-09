const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AddressSchema = require('./addresses');

const schema = mongoose.Schema;

const OrdersSchema = new schema({
    email: {
        type: String,
        ref:'user',
        trim: true,
        required: [true, 'Please provide a Email'],
        match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Please provide a valid Email Address']
    },
    amount: {
        type: Number,
        required: [true, 'Please provide a Amount'],
        match: [/^[0-9]$/, 'Please provide a valid Amount']
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["new", "packed", "shipped", "completed", "cancelled", "delayed"],
        default: "new"
    },
    books: [
        {
            quantity:
            {
                type: Number,
                required: [true, 'Please provide a Quantity Number']
            },
            isbn:
            {
                type: Number,
                required: [true, 'Please provide a ISBN Number'],
                match: [/^[0-9]{10,13}$/, 'Please provide a valid ISBN Number']
            }
        }
    ],
    address: {
        type: AddressSchema,
        required: [true, 'Please provide a Address']
    },
    paymentStatus: {
        type: Boolean,
        default: false
    }
});

const Orders = new mongoose.model('order', OrdersSchema);
module.exports = Orders;