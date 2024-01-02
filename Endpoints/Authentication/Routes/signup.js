const express = require("express")
const route = express.Router()
const User = require('../../../Models/UserSchema')

route.get("/signup", async(req,res)=>{
   const {name, email, password, phoneNumber, reference, location} = req.body
   if(!name || !email || !password || !phoneNumber || !reference || !location){
    res.statusCode = 400
    throw new Error("Please fill all fields")
   }
   const user_dey = await User.find({email})
   if(user_dey.length = 0){
      res.statusCode = 400
    throw new Error("User already exists", User.find({email}))
   }
   if(!email.slice(-10) === "@gmail.com" || !email.slice(-10) === "@yahoo.com"){
      res.statusCode = 400
      throw new Error("please enter a valid email")
   }
   const securePassword = bcrypt.hash(password, 10)
   const user = User.create({name, email, password: securePassword, phoneNumber, reference, location})
   res.status(201).json({message: "User Successfully created", User:{name: user.name, id:user.id}})
   
 })

module.exports = route