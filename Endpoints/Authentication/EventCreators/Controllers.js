const EventCreator = require("../../../Models/eventCreatorsSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AsyncHandler = require("express-async-handler")
const emailValidator = require("../../../utils/emailValidator")

//@desc sign-up controller for eventGoers
const signupControllerEventCreators =  AsyncHandler(async(req,res)=>{
    const {type, Fullname, Email, Password, Phone_Number, Whatsapp_Number, Address, Bank_Name, Bank_AccountNumber, Bank_AccountName, ID_Type, ID_Number } = req.body
    const user =await EventCreator.findOne({Email});
    const emailTrue = emailValidator(Email)
    if(!emailTrue){
      res.status(400);
      throw new Error("please enter a valid Email")
    }
    if(!user){
    const securePassword = await bcrypt.hash(Password, 10)
    const user = await EventCreator.create({type, Fullname, Email, Password: securePassword, Phone_Number, Whatsapp_Number, Address, Bank_Name, Bank_AccountNumber, Bank_AccountName, ID_Type, ID_Number})
    res.status(201).json({message: "Event CREATOR Successfully created", User:{name: user.Fullname},emailTrue} )
    }else if(user){
      res.status(400);
      throw new Error("User already exists")
    }
  })

  //@desc login controller for eventGoers
const loginControllerEventCreators =  AsyncHandler(async(req,res)=>{
    const {Email, Password} = req.body
    const user = await EventCreator.findOne({Email})
    if(!user){
      res.status(400);
      throw new Error("Invalid username or Password")
    }else if(user && await bcrypt.compare(Password, user.Password)){
        const accessToken = await jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.status(200).json({message: `Login Successful, welcome ${user.username}`, accessToken})
    }
})

module.exports = {signupControllerEventCreators, loginControllerEventCreators}
    
