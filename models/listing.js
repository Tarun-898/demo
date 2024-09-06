const mongoose=require('mongoose');
const {Schema}=mongoose;
const Review=require("./review.js")
const listenSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    image: {
        filename: {
            type: String,
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
        },
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review"
    },
],
});

listenSchema.post("findOneAndDelete",async(list)=>{
    if(list){
    await Review.deleteMany({_id:{$in:list.reviews}});
}});

const list=mongoose.model("list",listenSchema);
module.exports=list;