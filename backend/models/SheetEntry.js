const mongoose=require("mongoose");

const SheetEntrySchema=new mongoose.Schema({
    name:String,
    number: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d{10}$/.test(v),
      message: "Phone number must be exactly 10 digits"
    }
  },
    items:[   {
      product: String,
      quantity: Number,       
    },],
    date:{type:Date,default:Date.now}
});

module.exports=mongoose.model("SheetEntry",SheetEntrySchema)