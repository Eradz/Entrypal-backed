const User = require("../../Models/eventGoersSchema")
const EventCreator = require("../../Models/eventCreatorsSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


//@desc GET All users controller
//access private
const getAllUsers = async(req,res) =>{
     const user = await User.find({})
     res.status(200).json({message: user})
}

//@desc GET SINGLE user controller
//access private
const getSingleUser = async(req,res) =>{
    const {id} = req.params
    const user = await User.findById(id)
    const {password, ...users} = user
    res.status(200).json({message: users})
}

//@desc sign-up controller for eventGoers
const signupControllerEventGoers = async(req,res)=>{
    const {fullname,username, email, password, phoneNumber, reference, location} = req.body
    const user =await User.findOne({email});
    if(!fullname || !username || !email || !password || !phoneNumber || !reference || !location){
       res.status(400).json({error:"Please fill all fields"})
    }
    if(email.slice(-10) !== "@gmail.com"){
       res.status(400).json({error: "please enter a valid email"})
    }
    if(!user){
    const securePassword = await bcrypt.hash(password, 10)
    const user = await User.create({username, fullname, email, password: securePassword, phoneNumber, reference, location})
    res.status(201).json({message: "User Successfully created", User:{name: user.fullname, id:user.id}})
    }else if(user){
       res.status(400).json({message:"User already exists "})
    }
  }

  //@desc login controller for eventGoers
  const loginControllerEventGoers =  async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        res.status(404).json({message: "Invalid username or password"})
    }else if(user && await bcrypt.compare(password, user.password)){
        const accessToken = await jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.status(200).json({message: `Login Successful, welcome ${user.username}`, accessToken})
    }
  }

//@desc sign-up controller for eventGoers
const signupControllerEventCreators = async(req,res)=>{
    const {fullname, email, password, phoneNumber, whatsappNumber, address, Bank_Name, Bank_AccountNumber, Bank_AccountName, ID_Type, ID_Number } = req.body
    const user =await User.findOne({email});
    if(!fullname || !email || !password || !phoneNumber || !Bank_Name || !Bank_AccountNumber || !Bank_AccountName || !ID_Type || !ID_Number || !address || !whatsappNumber){
       res.status(400).json({error:"Please fill all fields"})
    }
    if(email.slice(-10) !== "@gmail.com"){
       res.status(400).json({error: "please enter a valid email"})
    }
    if(!user){
    const securePassword = await bcrypt.hash(password, 10)
    const user = await User.create({username, fullname, email, password: securePassword, phoneNumber, whatsappNumber, address, Bank_Name, Bank_AccountNumber, Bank_AccountName, ID_Type, ID_Number})
    res.status(201).json({message: "Event CREATOR Successfully created", User:{name: user.fullname}})
    }else if(user){
       res.status(400).json({message:"User already exists "})
    }
  }

  //@desc login controller for eventGoers
const loginControllerEventCreators =  async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        res.status(404).json({message: "Invalid username or password"})
    }else if(user && await bcrypt.compare(password, user.password)){
        const accessToken = await jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.status(200).json({message: `Login Successful, welcome ${user.username}`, accessToken})
    }
}

module.exports = {signupControllerEventGoers, signupControllerEventCreators, loginControllerEventCreators, loginControllerEventGoers, getAllUsers, getSingleUser}
