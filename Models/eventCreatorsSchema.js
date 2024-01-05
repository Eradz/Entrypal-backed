const mongoose = require("mongoose")
const Schema = mongoose.Schema
const EventCreators = new Schema({
    type:{
        type: String
    },
    fullname:{
        type: String,
    },
    email:{
        type: String,
    },
    phoneNumber:{
        type: String,
    },
    whatsappNumber:{
        type: String,
    },
    password:{
        type: String,
    },
    address:{
        type: String
    },
    Bank_Name:{
        type: String
    },
    Bank_AccountNumber:{
        type: String
    },
    Bank_AccountName:{
        type: String
    },
    ID_Type:{
        type: String,
        enum:["Voters card", "NIN", "Drivers Licence", "International Passport"],
        default: " "
    },
    ID_Number:{
        type: String
    }
},{
    timestamps: true
})

const EventCreator = mongoose.model("EventCreators", EventCreators)
module.exports = EventCreator 