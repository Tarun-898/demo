const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../public/util/wrapasync.js");
const expressError=require("../public/util/expresserror.js");
const {reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const list=require("../models/listing.js");


const validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
        let errMsg =error.details.map((el)=>el.message).join(",")
        throw new expressError(400,error)
  }
  else{
        next();
  }
};


router.post("/",validateReview,async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const data = await list.findById(id);
    let newReview = new Review(req.body.review);
    console.log(newReview);
    await newReview.save(); 
    data.reviews.push(newReview); 
    await data.save(); 
    req.flash("success","New review created");
    res.redirect("/lists/"+id); 
  });

  router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let{id,reviewId}=req.params;
    console.log(id,reviewId);
    await list.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect("/lists/"+id);
  }));

  module.exports=router;