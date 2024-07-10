const Ticket = require("../../Models/TicketSchema")
const AsyncHandler = require("express-async-handler")
const Event = require("../../Models/EventSchema")
const EventGoer = require("../../Models/eventGoersSchema")
const initializePayment  = require("../../utils/ticketPayment")
const axios = require("axios")
const TicketReferenceModel = require("../../Models/TicketReferenceSchema")


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
    const {data, totalAmount} = req.body
    const eventGoer = await EventGoer.findById(eventGoerId)
    // tickets in the req.body is an array of strings bearing the ticket ids(if he bought more than 1) and quantity bought
    //eg const data = [{Name: "Anagu Chidiebere Andrew",  Email: "Anaguchidiebere@gmail.com",	TicketId: 26613137379317 },
    //{Name: "Adibe Chukwuemeka Joshua" ,  Email: "chukwuemeka@gmail.com",	TicketId: 26613137379317},
    //{Name: "Edeh Johnpaul Chukwuemeka",  Email:  "Edehjohnpaul@gmail.com", TicketId: 26613137379317 },
    //{Name: "Ogbu Vincent",  Email: "VincentOgbu@gmail.com",	TicketId: 26613137379317},]
    const metadata = {data, eventGoerId} ;
    const payment_process = await initializePayment(eventGoer.email, totalAmount, metadata)
    res.status(200).json({message:payment_process})
})


//ticket verification and database integration
const verifyPayment = AsyncHandler(async(req,res)=>{
    const secretKey = process.env.PAYSTACK_SECRET_KEY
    const {reference} = req.params
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {headers: {
        'Authorization': `Bearer ${secretKey}`
        }
    })
    if(response.data.data.status !== "success"){
        res.status(400).json({message: "Payment Failed"})
    }
//      From the metadata gotten from the response we get the EventGoerId and add it o the ticket model
//     then we update the ticket array in the EventGoer model with the ticket id and number eg const tickets = [{Name: "Anagu Chidiebere Andrew",  Email: "Anaguchidiebere@gmail.com",	TicketId: 26613137379317 },{Name: "Adibe Chukwuemeka Joshua" ,  Email: "chukwuemeka@gmail.com",	TicketId: 26613137379317},{Name: "Edeh Johnpaul Chukwuemeka",  Email:  "Edehjohnpaul@gmail.com", TicketId: 26613137379317 },{Name: "Ogbu Vincent",  Email: "VincentOgbu@gmail.com",	TicketId: 26613137379317},]
    const {paid_at} = response.data.data
    const {data, eventGoerId} = response.data.data.metadata
    const Ticketreference = "bbsh debdbeduendunend"
    const qrcode = 'https://res.cloudinary.com/dussvilm5/image/upload/v1717776412/QR%20codes/Chidiebere2829.png'
    
    //Update the TicketReference model 
   Promise.all(data.map(async({name, email, TicketId})=> {
        const TicketReference = await TicketReferenceModel.create({EventGoerID: eventGoerId, TicketID: TicketId, name, email, qrcode, reference:Ticketreference, DateOfPurchase: paid_at})
        return TicketReference
    }))
    res.status(200).json({message: "Payment successful"}) 
    })
module.exports = {createTicket, ticketPayment, verifyPayment, getAllTickets, getEventTickets}