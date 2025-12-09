// backend/routes/adminAuth.js
const express = require("express");
const router = express.Router();
const AdminUser = require("../models/AdminUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /auth/admin/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await AdminUser.findOne({ username });
    if (!admin) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
