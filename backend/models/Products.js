const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalQuantity: { type: Number, required: true }, // total stock
  quantity: { type: Number, required: true },      // current available stock
  type: { type: String, required: true },          // sheet or powertool
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
