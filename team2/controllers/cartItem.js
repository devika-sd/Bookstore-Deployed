const CartItem = require("../../models/cartlist"); 
const asyncHandler = require("../middleware/async");
const Product = require("../../models/book");
// var mongoose = require('mongoose');
const fetchAllCartItems = asyncHandler(async (req, res, next) => {


  try {
    const cartItems = await CartItem.find({ email: req.params.email }).select("books ");


    var prod = new Array();
    for (let index = 0; index < cartItems[0].books.length; index++) {
      const element = cartItems[0].books[index].bookid;
      let doc = await Product.findOne({ _id: element })
      let arr = { ...doc._doc, quantity: cartItems[0].books[index].quantity }
      prod.push(arr)
    }
    if (!cartItems) {
      return res.status(400).json({
        success: false
      });
    }
    res.status(201).json({
      success: true,
      data: prod
    });
  }
  catch (error) {
    res.status(404).send(error)
  }


})


const delCartItems = asyncHandler(async (req, res, next) => {
  try {
    const b = req.body.bookid;
    const query = {
      email: req.params.email
    };
    let audioIndex = new Array();
    CartItem.findOne(query).then(item => {
      audioIndex = item.books.filter(item => item.bookid != b);
      item.books = audioIndex
      item.save();
    })
    res.status(201).json({
      success: true,
      data: audioIndex
    });
  }
  catch (error) {
    res.status(400).send(error)
  }

});



const patchCartItems = asyncHandler(async (req, res, next) => {
  try {
    const b = req.body.bookid;
    const query = {
      email: req.params.email,
    };
    var bool = false;
    if (req.body.QuantityChange === "add") {
      bool = true;
    }
    CartItem.findOne(query)

      .then((item) => {
        const audioIndex = item.books.map((item) => item.bookid).indexOf(b);
        if (bool) {
          if (item.books[audioIndex].quantity < req.body.max) {
            item.books[audioIndex].quantity += 1;
          }
        } else {
          if (item.books[audioIndex].quantity > 1) {
            item.books[audioIndex].quantity -= 1;
          }
        }

        item.save();
      })

    res.status(201).json({
      success: true,
      data: [],
    });
  }
  catch (error) {
    res.status(400).send(error)
  }
});

const patchAmount = asyncHandler(async (req, res, next) => {
  try {
    const filter = { email: req.params.email };
    const update = { amount: req.body.amount };


    let doc = await CartItem.findOneAndUpdate(filter, update, {
      returnOriginal: false
    });
    res.status(201).json({
      success: true,
      data: doc
    });
  }
  catch (error) {
    res.status(400).send(error)
  }

})

module.exports = {
  fetchAllCartItems,
  delCartItems,
  patchCartItems,
  patchAmount
};
