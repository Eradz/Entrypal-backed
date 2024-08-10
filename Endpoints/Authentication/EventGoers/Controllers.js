const User = require("../../../Models/eventGoersSchema")
const paths = require("path")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AsyncHandler = require("express-async-handler")
const { sendEmail  } = require("../../../utils/sendEmail")


//@desc sign-up controller for eventGoers
const signupControllerEventGoers =  AsyncHandler(async(req,res)=>{
    const {fullname,username, email, password, phoneNumber, reference, location} = req.body
    const user =await User.findOne({email});
    if(!fullname || !username || !email || !password || !phoneNumber || !reference || !location){
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
    const otp =  Math.floor(1000 + Math.random() * 9000)
    const tokendirectory = paths.join( __dirname, "../../../views/token.ejs")
    sendEmail(email, fullname, 'Account Verification', otp,  tokendirectory)
    const securePassword = await bcrypt.hash(password, 10)  
    const secureotp = await bcrypt.hash(otp.toString(), 10)  
    const user = await User.create({username, fullname, email, password: securePassword, phoneNumber, reference, location, otp:secureotp})
    res.status(201).json({message: "User Successfully created", User:{name: user.fullname, id:user.id}})
    }else if(user){
      //  res.status(400).json({message:"User already exists "})
      res.status(400);
      throw new Error("User already exists")
    }
  })

  const verifyUser = AsyncHandler( async(req,res)=>{
    const {id} = req.params
    const {token} = req.body
    const user = await User.findById(id)
    const isVerified = await bcrypt.compare(token, user.otp) 
     if(!isVerified){
      throw new Error('Invalid token')
    }
    user.verified = true
    user.otp = ''
    await user.save()
    sendEmail(user.email, user.fullname, "Welcome to Ticketing made easy", '',  paths.join( __dirname, "../../../views/EventGoerSignup.ejs"))
    res.status(200).json({message: "User successfully verified"})
  })
  

    
  

  //@desc login controller for eventGoers
  const loginControllerEventGoers =  AsyncHandler(async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
      //   res.status(404).json({message: "Invalid username or password"})
      res.status(400);
      throw new Error("Invalid username or password")
    }else if(!user.verified){
      throw new Error("Invalid username or password")
        // res.status(400).json({messae: "Invalid password"})
    }else if(user && await bcrypt.compare(password, user.password)){
        const accessToken = await jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.status(200).json({message: `Login Successful, welcome ${user.username}`, accessToken})
    }
  })

  //@desc Get all Event Goers
const getAllEventGoers = AsyncHandler(async(req,res)=>{
  const users = await User.find()
  res.status(200).json({message: users})
})

//@desc Delete a particular Eveng Goer
const deleteEventGoer = AsyncHandler(async(req,res)=>{
  const {id}= req.params
  const user = await User.findOneAndDelete({ _id: id })
  res.status(200).json({message: `${user.fullname} has been sucessfully deleted`})
})


module.exports = {signupControllerEventGoers, loginControllerEventGoers, getAllEventGoers ,deleteEventGoer, verifyUser}
