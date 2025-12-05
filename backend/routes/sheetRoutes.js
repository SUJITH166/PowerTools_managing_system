const express = require("express");
const router = express.Router();
const SheetEntry = require("../models/SheetEntry");

router.post("/add", async (req, res) => {
  try {
    const newEntry = new SheetEntry(req.body);
    await newEntry.save();
    res.json({ success: true, message: "Saved Succesfully" });
  } catch (err) {
    res.status(500).json({ sucess: false, error: err.message });
  }
});

router.get("/all", async (req, res) => {
  const entries = await SheetEntry.find().sort({ date: -1 });
  res.json(entries);
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await SheetEntry.findByIdAndDelete(req.params.id);
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
module.exports = router;
