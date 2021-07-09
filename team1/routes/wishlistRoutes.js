const express = require('express')
const { protect } = require('../middleware/authMiddleware.js')

const router = express.Router()
const { getMyWishlist, removefromWishlist } = require('../controllers/wishListController')

router.route('/mywishlist').get(protect,getMyWishlist)
router.route('/mywishlist/:id').put(protect,removefromWishlist)

module.exports = router
