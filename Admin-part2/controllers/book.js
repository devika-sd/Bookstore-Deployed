const Book = require('../../models/book');
const asyncHandler = require('../../middleware/async');
const bcrypt = require('bcrypt');


const fetchAllBook = asyncHandler(async (req, res) => {

    res.status(200).json(res.advancedResults)
})

const addBook = asyncHandler(async (req, res, next) => {
    //Operatons on model

    let book = await Book.create(req.body);

    if(!book) res.json({ success: false, message:"Book is not added" });
    else res.status(201).json({ success: true, data: book,message:"Book is added successfully" });
})

const deleteBooksByTitle = asyncHandler(async (req, res, next) => {

    let bookDel = await Book.findOneAndDelete({ title: req.params.title })

    if (!bookDel) throw new Error(`Book Title(${req.params.title}) is not found`)
    res.status(200).json({ success: true, data: bookDel,message:"Book is deleted successfully" })

})

const fetchBooksByTitle = asyncHandler(async (req, res, next) => {

    const books = await Book.findOne({ title: req.params.title })

    if (!books) throw new Error(`Book Title(${req.params.title}) is not found`)
    res.status(200).json({ success: true, data: books,message:"Book is found" })

})

const updateBookDetails = asyncHandler(async (req, res, next) => {
    const books = await Book.findOne({_id:req.params._id});
   
        books.title= req.body.title;
        books.category= req.body.category;
        books.isbn = req.body.isbn;
        books.authors = req.body.authors;
        books.price = req.body.price;
        books.discount = req.body.discount;
        books.available = req.body.available;
        books.publishDate = req.body.publishDate;
    
        await books.save().then(saved=>{
          
            if(saved===books)
            {
                res.json({ success: true, data: [books],message:"Book details updated successfully" });
            }
            else
            {
                res.json({ success: false, message:"Book details not updated" });
            }
        });
        
});

const categoryforPie = asyncHandler(async (req, res) => {
    
    const statusArr = [
        { "horror": 0 },
        { "comedy": 0 },
        { "adventure": 0 },
        { "fiction": 0 },
        { "ancient": 0 },
        { "sciencefiction": 0 },
        { "thriller": 0 },
        { "spritual": 0 },
        { "classic": 0 }
    ]
    for (let index = 0; index < statusArr.length; index++) {
        const element = statusArr[index];
        for (var key in element) {
            let count = await Book.count({ category: key.toLowerCase() })
            console.log(key + "-->  " + count);
            statusArr[index][key] = count
        }

    }
    console.log(statusArr)
    res.json({ success: true, data: statusArr })

})
const categoryforchart = asyncHandler(async (req, res) => {
    let books = await Book.aggregate(
        [
            {
                $group: {
                    _id: "$category",
                    count: { $sum: "$available" }
                }
            },
            {$sort: {_id: -1}}
        ]
    )
     res.json({ success: true, data: books })

})

module.exports = {addBook, fetchAllBook, deleteBooksByTitle, updateBookDetails, fetchBooksByTitle, categoryforPie,categoryforchart};