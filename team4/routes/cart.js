var express = require('express')
var router = express.Router()
const {insertdata,findallcart,findonecart} = require('../../team4/controllers/cartlist')

router.route('/')
.get(findallcart)
.post(insertdata)

router.route('/:email')
.get(findonecart)

module.exports = router
