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
    }

})

const Ticket = mongoose.model("tickets", ticket)
modules.exports = Ticket