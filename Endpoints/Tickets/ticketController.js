const Ticket = require("../../Models/TicketSchema")
const AsyncHandler = require("express-async-handler")
const Event = require("../../Models/EventSchema")

//@desc GET tickets for a particular event
//ROUTE GET
const getTickets = AsyncHandler( async(req,res) =>{
    const {Event_name} = req.body
    const ticket = Ticket.findOne({Event_name})
    if(!ticket){

    }
})

//@desc CREATE ticket route
//route PUT
const createTicket =  AsyncHandler( async(req, res) =>{
    const {id} = req.params
    const {Ticket_name,Price, Features, Quantity} = req.body
    const event = await Event.findById(id)
    const tickets = await Ticket.find({Event_id: event.id})

    const ticketExist = tickets.map((ticket) =>{
        return ticket.Ticket_name === Ticket_name ? true : false
    }).includes(true)
    if(!event){
        res.status(400)
        throw new Error("Event does not exist")
    } 
    if(ticketExist){
        res.status(400)
        throw new Error("A Ticket with this name already exists for this event")
    }
       const created_ticket = await Ticket.create({Event_id: id, Ticket_name, Price, Features, Quantity})
        res.status(200).json({message: "Ticket created successfully ", created_ticket}) 
})
module.exports = {createTicket}