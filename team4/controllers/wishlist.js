const WishListBooks = require('../../models/wishlist')
const asyncHandler = require('../middleware/asyncHandler.js');

const insertdata = asyncHandler(async(req,res,next)=>{
    let searchData=await WishListBooks.find({email : req.body.email});
    if(searchData.length === 0){
        let postNewbook = await WishListBooks.create({email:req.body.email,books: [req.body.books]});
        console.log(postNewbook);
        res.status(201).json({success: "Added Sucessfully"})
    }else{
        let book_id = await WishListBooks.findOneAndUpdate({email:req.body.email},{$addToSet:{books:req.body.books}},{
            new: true,
            runValidators: true
        })
        res.json({success:true, data: book_id});
    }
})

const findonewishlist = asyncHandler(async(req,res,next)=>{
    let searchData=await WishListBooks.findOne({email : req.params.email})
    if(searchData.length !=0){
        res.json(searchData);
        console.log(searchData);}
    else next({message:"no record found"});
})

const findallwishlist = asyncHandler(async(req,res,next)=>{
    let searchData=await WishListBooks.find({});
    if(searchData.length !=0){
        res.json(searchData);
        console.log(searchData);}
    else next({message:"no record found"});
})

module.exports = {insertdata,findonewishlist,findallwishlist};
