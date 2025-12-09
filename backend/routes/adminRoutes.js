const express = require("express");
const router = express.Router();
const ProductEntry = require("../models/ProductEntry");
const verifyAdmin = require("../middleware/verifyAdmin");

// Get all products
router.get("/all", verifyAdmin, async (req, res) => {
  const products = await ProductEntry.find().sort({ date: -1 });
  res.json(products);
});

// Add product
router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const product = new ProductEntry(req.body);
    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Edit product
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updated = await ProductEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete product
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await ProductEntry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
