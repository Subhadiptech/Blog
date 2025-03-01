//login and registering for  a user is done here

const express =require('express')
const router = express.Router();
const  User = require('../model/Userschema.js');
const bcrypt = require('bcrypt');

//register
router.post('/register', async (req,res)=>{
  
    try{
         //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newuser = new User({
      username:req.body.username,
      email: req.body.email,
      password:hashedPassword,
      institution:req.body.institution,
      desc:req.body.desc,
      profilePicture:req.body.profilePicture,
      city:req.body.city,
      Firstname:req.body.Firstname,
      Lastname:req.body.Lastname,
  }) 
  const user=await newuser.save();
  res.status(200).json(user);

    } catch(err){
        res.status(500).json(err);
    }
})



//Login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("user not found ,enter correct email id and password");
  
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("wrong password")
  
       res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  });

module.exports =router;