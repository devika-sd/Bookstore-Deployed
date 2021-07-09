const asyncHandler = require('express-async-handler');
const Reviews = require('../../models/review')
const Books = require('../../models/book')

const findAllreview = asyncHandler(async(req, res)=>{
  res.status(200).json(res.advancedResults);
})

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
    const review = {
      rating: Number(rating),
      comment,
      user : req.body.user,
      book : req.body.book
    }
    const product = await Reviews.create(review)
    res.status(201).json({ message: 'Review added', review: product })
})

const AverageRating = asyncHandler(async (req, res) => {
await Reviews.aggregate(
  [
      {
          $group: {
              _id: "$book",
              average_ : {$avg : "$rating"},
              },
      },
      {$sort: {average_: -1}},

  ]
).exec(function(err, doc) {
  Books.populate(doc, {path: '_id'}, function(err, populatedTransactions) {
    console.log("populatedTransactions",populatedTransactions)
    res.status(201).json(populatedTransactions)
  });
});
})

module.exports = {createProductReview, findAllreview,AverageRating};

