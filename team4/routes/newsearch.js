var express = require('express')
var router = express.Router()
const query_find = require('../middleware/query_params');
const {findAlldata,insertdata,findDataBasedOnSearchItem,findDataBasedOnBookid} = require('../controllers/newsearch')
const Reviews  = require('../../models/review')
const { createProductReview, findAllreview,AverageRating}  =  require('../../team5/controllers/review')
const Books = require('../../models/book');

router.route('/review')
 .get(query_find(Reviews),findAllreview)
 .post(createProductReview)

router.route('/review/avgrating')
 .get(query_find(Reviews),AverageRating)

router.route('/')
 .get(query_find(Books),findAlldata)
 .post(insertdata)

router.route('/CommonSearch/:searchitem')
 .get(findDataBasedOnSearchItem)

router.route('/:id')
.get(findDataBasedOnBookid)

module.exports = router
