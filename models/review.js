const mongoose=require("mongoose");
const {Schema}=mongoose;
const reviewSchema= new mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        default:3,
    },
    comment:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
});
const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;