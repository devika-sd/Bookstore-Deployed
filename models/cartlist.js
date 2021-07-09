const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartListBooksSchema = new Schema({
    email:{
        type:String,
        ref:'user',
        unique:true
    },
    amount : {
        type : Number
    },
    books:[
            {
                quantity:{
                    type: Number,
                    default: 1
                },
                bookid:{
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'book',
                }
            }
    ],
});

CartListBooksSchema.index({title: "text", author: "text"})

const CartListBooks = mongoose.model('CartList', CartListBooksSchema);

module.exports = CartListBooks;