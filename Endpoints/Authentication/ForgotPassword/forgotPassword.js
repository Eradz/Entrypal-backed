const express = require("express")
const path = require("path")
const route = express.Router()
const bcrypt = require("bcryptjs")
const AsyncHandler = require("express-async-handler")
const EventCreator = require("../../../Models/eventCreatorsSchema")
const EventGoer = require("../../../Models/eventGoersSchema")
const { sendEmail } = require("../../../utils/sendEmail")


route.post("/", AsyncHandler(async(req,res)=>{
    const {email} = req.body

    if(!email){
        res.status(401).json({message: "Please enter Email"})
    }
    const eventgoer = await EventGoer.findOne({email})
    if(!eventgoer){
        res.status(401).json({message: "User does not exist"})
    }
    else{
        const otp =  Math.floor(1000 + Math.random() * 9000)
        const secureotp = await bcrypt.hash(otp.toString(), 10)  
        eventgoer.otp = secureotp
        await eventgoer.save()
        const directory = path.join(__dirname, "../../../views/token.ejs")
        sendEmail(email, eventgoer.fullname, "Reset Password Verification", otp, directory)
    }
}))

route.post('/verify', AsyncHandler( async(req,res)=>{
    const {token, email, password} = req.body
    const user = await EventGoer.findOne({email})
    const isVerified = await bcrypt.compare(token, user.otp) 
     if(!isVerified){
      throw new Error('Invalid token')
    }
    const securePassword = await bcrypt.hash(password, 10)
    user.password = securePassword
    await user.save()
    res.status(200).json({message: "User password successfully updated"})
  }))


module.exports = route