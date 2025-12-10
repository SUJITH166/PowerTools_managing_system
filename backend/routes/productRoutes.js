const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

// Add Product
router.post('/add', async (req, res) => {
  try {
   const { name, totalQuantity, quantity, type } = req.body;

if (!name || totalQuantity == null || quantity == null || !type) {
  return res.status(400).json({ success: false, error: "All fields required" });
}

const newProduct = new Product({ name, totalQuantity, quantity, type });

    await newProduct.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ GET all products
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Delete product by id
router.delete('/:id',async (req,res)=>{
    const {id}=req.params;
    try{
        
        const products=await Product.findByIdAndDelete(id);
        res.json({success:true});
    }catch(err){
        res.status(500).json({success:false,error:err.message});
    }
}),

// GET products by type
router.get("/type/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const products = await Product.find({ type });  
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
