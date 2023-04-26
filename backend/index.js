const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const cors=require("cors")
const app=express();
const pinroutes=require("./routes/pin")
const userroutes=require("./routes/user")
dotenv.config()
app.use(express.json())
app.use(cors())
app.use("/api/pin",pinroutes)
app.use("/api/user",userroutes)

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}).then(()=>{console.log("mongo connected")}).catch((err)=>{console.log(err)})
app.listen(5000,()=>{console.log("backend connected")})