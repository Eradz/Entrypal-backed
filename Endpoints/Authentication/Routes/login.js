const express = require("express")
const route = express.Router()
const User = require("../../../Models/UserSchema")
const bcrypt = require("bcryptjs")
route.post("/login", async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        res.status(404).json({message: "Invalid username or password"})
    }else if(user && await bcrypt.compare(password, user.password)){
        res.status(200).json({message: `Login Successful, welcome ${user.username}`})
    }
})

module.exports = route