const EventCreator = require("../../../Models/eventCreatorsSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const paths = require("path")
const AsyncHandler = require("express-async-handler")
const emailValidator = require("../../../utils/emailValidator")
const { sendEmail } = require("../../../utils/sendEmail")



//@desc sign-up controller for event Creators
const signupControllerEventCreators =  AsyncHandler(async(req,res)=>{
    const {type, Fullname, Email, Password, Whatsapp_Number, Address, Bank_Name, Bank_AccountNumber, Bank_AccountName, ID_Type, ID_Number, username } = req.body
    const user =await EventCreator.findOne({Email});
    const emailTrue = emailValidator(Email)
    if(!emailTrue){
      res.status(401);
      throw new Error("please enter a valid Email")
    }
    if(!user){
    const securePassword = await bcrypt.hash(Password, 10)
    const user = await EventCreator.create({type, Fullname, Email, Password: securePassword, Whatsapp_Number, Address, Bank_Name, Bank_AccountNumber, Bank_AccountName, ID_Type, ID_Number, username})
    sendEmail(user.Email, user.Fullname, "Approved as an eventcreator!", '', paths.join( __dirname, "../../../views/EventCreatorSignup.ejs"))
    res.status(201).json({message: "Event CREATOR Successfully created", User:{name: user.Fullname},emailTrue} )
    }else if(user){
      res.status(401);
      throw new Error("User already exists")
    }
  })

  //@desc login controller for event Creators
const loginControllerEventCreators =  AsyncHandler(async(req,res)=>{
    const {Email, Password} = req.body
    const user = await EventCreator.findOne({Email})
    if(!user){
      res.status(401);
      throw new Error("Invalid username or Password")
    }else if(user && await bcrypt.compare(Password, user.Password)){
        const accessToken = await jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.status(200).json({message: `Login Successful, welcome ${user.username}`, accessToken})
    }
})

//@desc Get all Event Creators
const getAllEventCreators = AsyncHandler(async(req,res)=>{
  const users = await EventCreator.find()
  res.status(200).json({message: users})
})

const deleteEventCreator = AsyncHandler(async(req,res)=>{
  const id = req.params
  const user = await EventCreator.findByIdAndDelete(id)
  res.status(200).json({message: `${user.fullname} has been sucessfully deleted`})
})

module.exports = {signupControllerEventCreators, loginControllerEventCreators, getAllEventCreators, deleteEventCreator}
    
