require("dotenv").config();
const express=require('express');
const cors=require('cors');
const { default: mongoose } = require('mongoose');
const app=express();
const sheetRoutes=require('./routes/sheetRoutes')

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB connected"))
.catch(err=>console.log(err));

app.use("/sheet", sheetRoutes);

app.listen(5000,()=>console.log('Server Running'))