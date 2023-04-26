const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    username:{
        type:String,
        min:4,
        require,
        unique:true
    },
    email:{
        type:String,
        max:50,
        require,
        unique:true
    },
    password:{
        type:String,
        min:6,
        require,
        unique:true
    }
},
{timestamps:true}
)
module.exports=mongoose.model("User",userschema)