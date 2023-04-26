const router = require("express").Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");
router.post("/register", async (req, res) => {
  const newuser = new user(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    newuser.password = hashedpassword;
    const savedUser = await newuser.save();
    res.status(200).json({
      success: true,
      savedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
    try{
        const loginuser= await user.findOne({username:req.body.username})
       if( !loginuser){
            res.status(404).json({
                success:false,
                message:"user not registered"
            })
        }
        else
        {
           const validpassword= await bcrypt.compare(req.body.password,loginuser.password)
           if(!validpassword){
            res.status(400).json({
                success:false,
                message:"incorrect password"
            })
           }
           else{
            res.status(200).json({
                success:true,
                message:"user logged in",
                user:loginuser
            })
           }
        }
        }
        catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            })
        }const router = require("express").Router();
        const user = require("../models/user");
        const bcrypt = require("bcrypt");
        router.post("/register", async (req, res) => {
          const newuser = new user(req.body);
          try {
            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(req.body.password, salt);
            newuser.password = hashedpassword;
            const savedUser = await newuser.save();
            res.status(200).json({
              success: true,
              savedUser,
            });
          } catch (err) {
            res.status(500).json({
              success: false,
              message: err.message,
            });
          }
        });
        
        router.post("/login", async (req, res) => {
            try{
                const loginuser= await user.findOne({username:req.body.username})
               if( !loginuser){
                    res.status(404).json({
                        success:false,
                        message:"user not registered"
                    })
                }
                else
                {
                   const validpassword= await bcrypt.compare(req.body.password,loginuser.password)
                   if(!validpassword){
                    res.status(400).json({
                        success:false,
                        message:"incorrect password"
                    })
                   }
                   else{
                    res.status(200).json({
                        success:true,
                        message:"user logged in",
                        user:loginuser
                    })
                   }
                }
                }
                catch(err){
                    res.status(400).json({
                        success:false,
                        message:err.message
                    })
                }
        })
          
        
        module.exports = router;
        
})
  

module.exports = router;
