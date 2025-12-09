const mongoose = require("mongoose");

const ProductEntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, default: 0 },
  type: { type: String, enum: ["sheet", "powertool"], required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProductEntry", ProductEntrySchema);
