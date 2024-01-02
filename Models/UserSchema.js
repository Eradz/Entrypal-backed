const mongoose = require("mongoose")
const Schema = mongoose.Schema
const user = new Schema({
    fullname:{
        type: String,
        required: [true, "Please enter a Fullname"]
    },
    username:{
        type: String,
        required: [true, "Please enter a Username"]
    },
    email:{
        type: String,
        required: [true, "Please enter an email"]
    },
    phoneNumber:{
        type: String,
        required: [true, "Please enter a Phone Number"]
    },
    password:{
        type: String,
        required: [true, "Please enter a Password"]
    },
    reference:{
        type: String
    },
    location:{
        type: String
    }
},{
    timestamps: true
})

const User = mongoose.model("User", user)
module.exports = User