const WishItem = require("../../models/wishlist");
const asyncHandler = require('../middleware/async');

const fetchAllWishItems = asyncHandler(async (req, res, next) => {
    try {
        const wishItems = await WishItem.findOne({ _id: req.params.id }).select('books');
        if (!wishItems) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(201).json({
            success: true,
            data: wishItems
        });
    } catch (error) {
        res.status(400).send(error)
    }
})

const addWishItems = asyncHandler(async (req, res, next) => {
    try {
        let searchData = await WishItem.find({ email: req.params.email });
        if (searchData.length === 0) {
            let postNewbook = await WishItem.create({ email: req.params.email, books: [req.body.bookid] });
            res.status(201).json({ success: "Added Sucessfully" })
        } else {
            let book_id = await WishItem.findOneAndUpdate({ email: req.params.email }, { $addToSet: { books: req.body.bookid } }, {
                new: true,
                runValidators: true
            })
            res.json({ success: true, data: book_id });
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
})


module.exports = { fetchAllWishItems, addWishItems }