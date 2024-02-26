const mongoose = require("mongoose")
const Schema = mongoose.Schema
const EventGoer = new Schema({
    googleId:{
        type: String,
        default: ''
    },
    fullname:{
        type: String,
        required: [true, "Please enter Fullname"]
    },
    username:{
        type: String,
        required: [true, "Please enter Username"]
    },
    email:{
        type: String,
        required: [true, "Please enter Username"]
    },
    phoneNumber:{
        type: String,
    },
    password:{
        type: String,
    },
    reference:{
        type: String
    },
    location:{
        type: String
    },
    otp:{
        type: String
    }
},{
    timestamps: true
})

const User = mongoose.model("EventGoer", EventGoer)
module.exports = User