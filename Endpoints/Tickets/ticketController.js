const Ticket = require("../../Models/TicketSchema")
const AsyncHandler = require("express-async-handler")
const Event = require("../../Models/EventSchema")
const EventGoer = require("../../Models/eventGoersSchema")
const initializePayment  = require("../../utils/ticketPayment")
const axios = require("axios")


//@desc GET All tickets in DATABASE
//ROUTE GET
const getAllTickets = AsyncHandler( async(req,res) =>{
    const ticket = await Ticket.find({})
    res.status(200).json({message: ticket})

})
//@desc GET tickets for a particular event
//ROUTE GET
const getEventTickets = AsyncHandler( async(req,res) =>{
    const {Event_id} = req.params
    const ticket = await Ticket.find({Event_id})
    res.status(200).json({message: ticket})

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
    // tickets in the req.body is an array of strings bearing the ticket ids(if he bought more than 1) and quantity bought
    //eg ["Regular_ticket_id 2", "vvip_ticket_id 1", "Vip_ticket_id 2"]
    const metadata = {tickets, eventGoerId} ;
    const payment_process = await initializePayment(eventGoer.email, totalAmount, metadata)
    console.log(payment_process);
    res.status(200).redirect(payment_process)
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
const verifyPayment = AsyncHandler(async(req,res)=>{
    const secretKey = process.env.PAYSTACK_SECRET_KEY

    const {reference} = req.params
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {headers: {
        'Authorization': `Bearer ${secretKey}`
        }
})
    console.log(response.data.data)
    res.status(200).send(response.data.data)
})
module.exports = {createTicket, ticketPayment, verifyPayment, getAllTickets, getEventTickets}