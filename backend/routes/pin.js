const router=require("express").Router();
const pin=require("../models/pin") 

// create a pin
router.post("/",async(req,res)=>{
   
    const newpin=new pin(req.body)
    
    try{
      const savedpin=  await newpin.save();
   
     res.status(200).json({
        success:true,
        savedpin
      })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
})
//get all the pins
router.get("/",async(req,res)=>{
    try{
   const pins= await pin.find();
   res.status(200).json({
    success:true,
    pins
   })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
})


module.exports=router