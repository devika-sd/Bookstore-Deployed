var express = require('express')
var app = express()
var router = express.Router()
const { fetchAllWishItems, addWishItems } = require('../controllers/wishItem')
// const WishItem = require('../model/wishItem')

router.route('/:id')

   .get(fetchAllWishItems)

router.post("/:email", addWishItems);

// .post(addWishItems)

module.exports = router