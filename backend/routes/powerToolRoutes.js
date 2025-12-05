const express=require('express');
const router=express.Router();
const PowerToolEntry=require("../models/PowerToolEntry");

router.post('/add',async (req,res)=>{
    try{
        const newEntry=new PowerToolEntry(req.body);
        await newEntry.save();
        res.json({success:true,message:"Saved Succesfully"});
    }catch(err){
        res.status(500).json({sucess:false,error:err.message});
    }
});

router.get('/all',async(req,res)=>{
    const entries=await PowerToolEntry.find().sort({date:-1});
    res.json(entries);
});
module.exports=router;