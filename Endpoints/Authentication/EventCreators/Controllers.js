const EventCreator = require("../../../Models/eventCreatorsSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AsyncHandler = require("express-async-handler")

//@desc sign-up controller for eventGoers
const signupControllerEventCreators =  AsyncHandler(async(req,res)=>{
    const {type, fullname, email, password, phoneNumber, whatsappNumber, address, Bank_Name, Bank_AccountNumber, Bank_AccountName, ID_Type, ID_Number } = req.body
    const user =await EventCreator.findOne({email});
    if(!type || !fullname || !email || !password || !phoneNumber || !Bank_Name || !Bank_AccountNumber || !Bank_AccountName || !ID_Type || !ID_Number || !address || !whatsappNumber){
       //  res.status(400).json({error:"Please fill all fields"})
      res.status(400);
      throw new Error("Please fill all fields")
    }
    if(email.slice(-10) !== "@gmail.com"){
       //  res.status(400).json({error: "please enter a valid email"})
      res.status(400);
      throw new Error("please enter a valid email")
    }
    if(!user){
    const securePassword = await bcrypt.hash(password, 10)
    const user = await EventCreator.create({fullname, email, password: securePassword, phoneNumber, whatsappNumber, address, Bank_Name, Bank_AccountNumber, Bank_AccountName, ID_Type, ID_Number})
    res.status(201).json({message: "Event CREATOR Successfully created", User:{name: user.fullname}})
    }else if(user){
       //  res.status(400).json({message:"User already exists "})
      res.status(400);
      throw new Error("User already exists")
    }
  })

  //@desc login controller for eventGoers
const loginControllerEventCreators =  AsyncHandler(async(req,res)=>{
    const {email, password} = req.body
    const user = await EventCreator.findOne({email})
    if(!user){
        //   res.status(404).json({message: "Invalid username or password"})
      res.status(400);
      throw new Error("Invalid username or password")
    }else if(user && await bcrypt.compare(password, user.password)){
        const accessToken = await jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.status(200).json({message: `Login Successful, welcome ${user.username}`, accessToken})
    }
})

module.exports = {signupControllerEventCreators, loginControllerEventCreators}
    
