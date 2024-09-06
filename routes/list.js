const express=require("express");
const router=express.Router();
const wrapAsync=require("../public/util/wrapasync.js");
const {listSchema}=require("../schema.js");
const expressError=require("../public/util/expresserror.js");
const list=require("../models/listing.js");


const validateList=(req,res,next)=>{
    let {error}=listSchema.validate(req.body);
    if(error){
        next(new expressError(400,error.message));
    }else{
        next();
    }
};


router.get("/",wrapAsync (async (req,res)=>{
    const allList=await list.find({});
    console.log(allList);
    res.render("./lists/index.ejs",{allList});

}));

router.get("/new",(req,res)=>{
    res.render("./lists/new.ejs")
});

router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listData= await list.findById(id).populate("reviews");
    if(!listData){
        res.redirect("/lists");
        req.flash("error","Path does not exist");
    }
    res.render("./lists/show.ejs",{listData});
}));


router.post("/",
    validateList,
    wrapAsync (async (req,res,next)=>{
    let {title,description,image,price,country,location}=req.body;
    const newList=new list({
        title:title,
        description:description,
        image:image,
        price:price,
        country:country,
        location:location
    });
    // if(!req.body.newList){
    //     throw new expressError(404,"Data not valid");
    // };
    console.log(newList);
    await newList.save();
    req.flash("success","New list created");
    res.redirect("lists");
}));


router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listData= await list.findById(id);
    if(!listData){
        req.flash("error","Path does not exist");
        res.redirect("/lists");
    }
    console.log(listData);
    res.render("./lists/edit.ejs",{listData});
}));

router.put("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await list.findByIdAndUpdate(id,{...req.body});
    console.log("succesfuly update");
    req.flash("success","list Updated");
    res.redirect("/lists/" + id);
}));

router.delete("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await list.findByIdAndDelete(id);
    req.flash("success","List Deleted");
    res.redirect("/lists");
}));
module.exports=router;