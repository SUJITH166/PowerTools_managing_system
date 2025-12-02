const mongoose=require("mongoose");

const SheetEntrySchema=new mongoose.Schema({
    name:String,
    number:String,
    items:[   {
      product: String,
      quantity: Number,       
    },],
    date:{type:Date,default:Date.now}
});

module.exports=mongoose.model("SheetEntry",SheetEntrySchema)