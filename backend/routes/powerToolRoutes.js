const express=require('express');
const router=express.Router();
const PowerToolEntry=require("../models/PowerToolEntry");
const Product=require('../models/Products')


router.post("/add", async (req, res) => {
  try {
    const { items } = req.body; // array of { product, quantity }
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, error: "No items provided" });
    }

    // Subtract quantity from each product
    for (const item of items) {
      const product = await Product.findOne({ name: item.product });
      if (!product) continue;

      // Prevent negative quantity
      const newQty = product.quantity - Number(item.quantity);
      if (newQty < 0) {
        return res.status(400).json({
          success: false,
          error: `${product.name} has only ${product.quantity} available`,
        });
      }

      product.quantity = newQty;
      await product.save();
    }

    // Save the sheet entry
    const newEntry = new PowerToolEntry(req.body);
    await newEntry.save();

    res.json({ success: true, message: "Saved Successfully and quantities updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
// router.post('/add',async (req,res)=>{
//     try{
//         const newEntry=new PowerToolEntry(req.body);
//         await newEntry.save();
//         res.json({success:true,message:"Saved Succesfully"});
//     }catch(err){
//         res.status(500).json({sucess:false,error:err.message});
//     }
// });

router.get('/all',async(req,res)=>{
    const entries=await PowerToolEntry.find().sort({date:-1});
    res.json(entries);
});
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await PowerToolEntry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, message: "Item Successfully deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
module.exports=router;