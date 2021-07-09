const Books = require('../../models/book')
const asyncHandler = require('../middleware/asyncHandler.js');

const insertdata = asyncHandler(async(req,res,next) => {
    let postNewbook = await Books.create(req.body);
    res.status(201).json({success: "Added Sucessfully"})
})

const findAlldata = asyncHandler(async(req, res)=>{
    res.status(200).json(res.advancedResults);
})

const findDataBasedOnSearchItem = async (req,res,next)=>{
    let searchData=await Books.find({ $text : { $search : req.params.searchitem, $caseSensitive: false } });
    if(searchData.length !=0){
        res.json(searchData);
    }
    else next({message:"no record found"});
}

 const findDataBasedOnBookid = async (req,res,next)=>{
     let searchData=await Books.find({_id: req.params.id});
     if(searchData.length !=0){
         res.json(searchData);
        }
     else next({message:"no record found"});
 }

 

module.exports = {insertdata,findAlldata,findDataBasedOnSearchItem, findDataBasedOnBookid};
