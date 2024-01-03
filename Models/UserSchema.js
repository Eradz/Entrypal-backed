const mongoose = require("mongoose")
const Schema = mongoose.Schema
const user = new Schema({
    fullname:{
        type: String,
    },
    username:{
        type: String,
    },
    email:{
        type: String,
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
    }
},{
    timestamps: true
})

const User = mongoose.model("User", user)
module.exports = User