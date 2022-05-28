const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel')
const { requireLogin } = require('../middlewares/auth')
const jwt = require ("jsonwebtoken");


//Registering the User

router.post('/register',async (req,res)=>{
    const {name, rationId, email, password }= req.body;
    try{
      let user = await User.findOne({rationId});
      if (user) {
        return res.status(400).json({error: "User already exists!"});
      }
      const hashed_password = await bcrypt.hash(password, 10);
      user = new User({
        name,
        rationId,
        email,
        password : hashed_password
      });

      await user.save().then(data=>{
        res.json(data);
      })
      return ress.status(201).json({message: "User created successfully"});
    }
    catch(e){
      console.log(e.message);
    }
  });

//Loging in  userRoute

router.post('/login', async(req,res) => {
  const { rationId, password} = req.body;
  try{

    let user = await User.findOne({rationId});
    if(!user){
      return res.status(400).json({error: "Invalid User"});
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
      return res.status(400).json({error: "Invalid Password"});
    }

    //creating toke for authentication
    const token = jwt.sign( {_id: user._id}, process.env.JWT_SECRET, {expiresIn:"0.5h"} );
    return res.json({ token })
  }
  catch(e){
    console.log(e.message);
  }
})



//testing
router.get("/", requireLogin, async (req, res)=>{
  try{
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  }
  catch(e){
    console.log(e);
  }
})


module.exports = router;
