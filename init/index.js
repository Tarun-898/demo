const mongoose=require("mongoose");
const initData=require("./data.js");
const list=require("../models/listing.js");

main()
.then(()=>{
    console.log("connected to DB");
}).catch((err) =>{ 
    console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

const initDB=async ()=>{
    await list.deleteMany({});
    await list.insertMany(initData.data);
    console.log("data initialized");
};
initDB();