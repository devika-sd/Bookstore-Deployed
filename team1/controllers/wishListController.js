const asyncHandler = require('express-async-handler')
const Wishlist = require('../../models/wishlist')
const Books = require('../../models/book')

const getMyWishlist = asyncHandler(async (req, res) => {
	const wishlist = await Wishlist.find({ email: req.user.email})
	const books=wishlist[0].books
	let bookarray=[]
	for(i in books){
	  bookarray[i]=await Books.find({_id:books[i]}) 
	}
	console.log(bookarray)
	res.json(bookarray)
  });
  
  
  const removefromWishlist = asyncHandler(async (req, res) => {
	console.log("ID",req.params.id)
	const user = await Wishlist.find({email: req.user.email})
	const books=user[0].books
	console.log(books)
	if(user){  
	  if(books.includes(req.params.id)){
		const wishlist = await Wishlist.findOneAndUpdate({email: req.user.email},{$pull:{books: req.params.id}},{'new':true})
		res.json({success:true, data: wishlist});
	  }
	  else
		res.json({success:false, message: "book not found"});
	}else{
	  res.json({success:false, message: "User not found"});
	}
	
  });
  
  module.exports = {getMyWishlist,removefromWishlist}