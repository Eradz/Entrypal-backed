const Ticket = require("../../Models/TicketSchema")
const AsyncHandler = require("express-async-handler")
const Event = require("../../Models/EventSchema")

const createTicket =  AsyncHandler( async(req, res) =>{
    const {id} = req.params
    const {Ticket_name,Price, Features} = req.body
    const user = await Event.findById(id)
    if(!user){
        res.status(400)
        throw new Error("Ticket must be created by a particular user")
    }else {
        const ticket = await Ticket.create({Event_id: id, Ticket_name, Price, Features})
        res.status(200).json({message: "Ticket created successfully ", ticket})
    }
})
module.exports = {createTicket}