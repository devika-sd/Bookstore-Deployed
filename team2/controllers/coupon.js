const Coupon = require('../../models/coupon')
const asyncHandler = require('../middleware/async');


const fetchAllCoupons = asyncHandler(async (req, res, next) => {
    try {
        res.json(res.advancedResults);
    }

    catch (error) {
        res.status(400).send(error)
    }
})

const addCoupons = asyncHandler(async (req, res, next) => {
    try {
        let couponRes = await Coupon.create(req.body);
        console.log(couponRes);
        res.status(201).json({ success: true })

    }
    catch (error) {
        res.status(400).send(error)
    }
})

const compareCoupons = asyncHandler(async (req, res, next) => {
    try {
        Coupon.findOne({ couponcode: req.body.couponcode })
            .then(result => {
                res.status(201).json({
                    message: 'succeeeeeess',
                    result: result
                })
            })
    }
    catch (error) {
        res.status(500).json({
            error: error
        })
    }
})



module.exports = { fetchAllCoupons, addCoupons, compareCoupons }