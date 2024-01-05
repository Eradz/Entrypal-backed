const mongoose = require("mongoose")
const Schema = mongoose.Schema
const EventGoer = new Schema({
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

const User = mongoose.model("EventGoer", EventGoer)
module.exports = User