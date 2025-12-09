// backend/createAdmin.js
const mongoose = require("mongoose");
require("dotenv").config();
const AdminUser = require("./models/AdminUser");

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Check if admin exists
    const existing = await AdminUser.findOne({ username: "admin" });
    if (!existing) {
      await AdminUser.create({ username: "admin", password: "admin123" });
      console.log("Admin user created!");
    } else {
      console.log("Admin user already exists!");
    }

    process.exit();
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

createAdmin();
