var express = require('express')
var router = express.Router()
const {insertdata,findonewishlist,findallwishlist} = require('../../team4/controllers/wishlist')

router.route('/')
.get(findallwishlist)
.post(insertdata)

router.route('/:email')
.get(findonewishlist)

module.exports = router
