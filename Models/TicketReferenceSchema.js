const mongoose = require("mongoose")
const schema = mongoose.Schema

const TicketReference = new schema({
    EventGoerID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'EventGoer'
    },
    TicketID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'tickets'
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    qrcode:{
        type: String,
        required: true,
    },
    reference:{
        type: String,
        required: true,
    },
    InAttendance:{
        type: String,
        required: true
    },
    DateOfPurchase:{
        type: String,
        required:true
    }
})

const TicketReferenceModel = mongoose.model("TicketReference", TicketReference)

module.exports = TicketReferenceModel