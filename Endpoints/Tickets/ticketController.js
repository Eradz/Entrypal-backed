const Ticket = require("../../Models/TicketSchema")
const AsyncHandler = require("express-async-handler")
const Event = require("../../Models/EventSchema")
const EventGoer = require("../../Models/eventGoersSchema")
const initializePayment  = require("../../utils/ticketPayment")
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
// @desc Ticket Payment route
// route POST
const ticketPayment = AsyncHandler(async(req,res) =>{
    const {eventGoerId} = req.params
    const {totalAmount, tickets} = req.body
    // const ticket = Ticket.findById(ticketId)
    const eventGoer = await EventGoer.findById(eventGoerId)

    const metadata = {tickets, eventGoerId} ;
    const payment_process = await initializePayment(eventGoer.email, totalAmount, metadata)
    console.log(payment_process); 
    res.status(200).json({message: payment_process}).redirect(payment_process)
    // tickets in the req.body is an array of strings bearing the ticket ids(if he bought more than 1) and quantity bought
    //eg ["Regular_ticket_id 2", "vvip_ticket_id 1", "Vip_ticket_id 2"]
    /* sample of code to extract details
    let tickets = ["Regular_ticket_id 2", "vvip_ticket_id 1", "Vip_ticket_id 2"]
const ticket_details = tickets.map((ticket,i)=>{
    let ticket_id = ticket.split(" ")
    if(i != tickets.length - 1){
        return(` ${ticket_id[1]} ${ticket_id[0]}`)
    } else{
     return(` ${ticket_id[1]} ${ticket_id[0]}`)   
    }
    
})
console.log(`User bought${ticket_details}`)
VM702:11 User bought 2 Regular_ticket_id, 1 vvip_ticket_id, 2 Vip_ticket_id
    */

})
//ticket verification and database integration
const verifyPayment = ()=>{

}
module.exports = {createTicket, ticketPayment, verifyPayment}