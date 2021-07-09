var express = require('express')
var app = express()
var router = express.Router()
const { fetchAllCoupons, addCoupons, compareCoupons } = require('../controllers/coupon')
const Coupon = require('../../models/coupon')
const advancedFind = require('../middleware/advancedFind');

router.route('/')
    .get(advancedFind(Coupon), fetchAllCoupons)
    .post(addCoupons)


router.route('/compare')
    .post(compareCoupons)


    router.delete('', (req, res, next) => {
        Coupon.deleteOne({ couponcode: req.body.couponcode })
            .then(result => {
                res.status(201).json({
                    message: 'succeeeeeess',
                    result: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    
    })
    
    module.exports = router