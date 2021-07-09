const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WishListBooksSchema = new Schema({
    email:{
        type:String,
        ref:'user',
    },
    books: [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref:'book',
        }
]
});

WishListBooksSchema.index({title: "text", author: "text"})

const WishListBooks = mongoose.model('WishList', WishListBooksSchema);

module.exports = WishListBooks;