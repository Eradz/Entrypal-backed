const User = require("../../Models/UserSchema")
const bcrypt = require("bcryptjs")

const signupController = async(req,res)=>{
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

const loginController =  async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        res.status(404).json({message: "Invalid username or password"})
    }else if(user && await bcrypt.compare(password, user.password)){
        res.status(200).json({message: `Login Successful, welcome ${user.username}`})
    }
}

module.exports = {signupController, loginController}
