const mongoose = require("mongoose")
const Schema = mongoose.Schema
const EventCreators = new Schema({
    type:{
        type: String,
        enum: ["Individual", "Business"],
        default: " "
    },
    Fullname:{
        type: String,
        required: [true, "Please enter your Full Name"]
    },
    Email:{
        type: String,
        required: [true, "Please enter your Email"]
    },
    Phone_Number:{
        type: String,
        required: [true, "Please enter your Phone Number"]
    },
    Whatsapp_Number:{
        type: String,
        required: [true, "Please enter your Whatsapp Number"]
    },
    Password:{
        type: String,
        required: [true, "Please enter your Password"]
    },
    Address:{
        type: String,
        required: [true, "Please enter your Address"]
    },
    Bank_Name:{
        type: String,
        required: [true, "Please enter your Bank Name"]
    },
    Bank_AccountNumber:{
        type: String,
        required: [true, "Please enter your Bank_AccountNumber"]
    },
    Bank_AccountName:{
        type: String,
        required: [true, "Please enter your Bank_AccountName"]
    },
    ID_Type:{
        type: String,
        enum:["Voters card", "NIN", "Drivers Licence", "International Passport"],
        default: " ",
        required: [true, "Please identify ID Type"]
    },
    ID_Number:{
        type: String,
        required: [true, "Please enter ID Number"]
    },
    username:{
        type: String,
        required: [true, "Please enter Preferred Name"]
    }
},{
    timestamps: true
})

const EventCreator = mongoose.model("EventCreators", EventCreators)
module.exports = EventCreator 