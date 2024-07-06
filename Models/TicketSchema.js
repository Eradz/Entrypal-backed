const mongoose = require('mongoose')
const schema = mongoose.Schema

const ticket = new schema({
    Event_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Events"
    },
    Ticket_name:{
        type: String,
        required: [true, "Please identify the name of the ticket"]
    },
    Price:{
        type: String,
        required: [true, "Please identity the Price of the ticket"]
    },
    Features:{
        type: String,
        required:[true, "Please enter its features, Separating each feature with a comma(,)"]
    },
    Quantity:{
        type: Number,
        required: [true, "Please enter a particular amount of Tickets to be available"]
    },
    qtyBought:{
        type: Number
    },
})

const Ticket = mongoose.model("tickets", ticket)
module.exports = Ticket