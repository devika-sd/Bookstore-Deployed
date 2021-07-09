const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CouponSchema = new Schema({
    couponcode: {
        type: String, unique: true, required: true, max: 6,

    },
    minamount: {
        type: Number, required: true,

    },

    offeramount: {
        type: Number, required: true,
    },
    activeornot: {
        type: Boolean, default: true,
    },


});

const Coupon = mongoose.model('Coupon', CouponSchema);

module.exports = Coupon;