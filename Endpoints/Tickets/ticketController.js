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
    res.status(200).json({message:payment_process})
    // res.status(200).redirect(payment_process)
    
   

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
    // From the metadata gotten from the response we get the EventGoerId and add it o the ticket model
    // then we update the ticket array in the EventGoer model with the ticket id and number eg ["Regular_ticket_id 2", "vvip_ticket_id 1", "Vip_ticket_id 2"]
    const {tickets, eventGoerId} = response.data.data.metadata
        // This gives the array of tickets the user paid for and updates the tickets model with the user who bought the tickets       
      const updateForTicket = { "$push": { "event_goers": eventGoerId } }
      await Promise.all(tickets.map(async(ticket)=>{return await Ticket.findByIdAndUpdate(ticket.split(" ")[0], updateForTicket)}))
      // The user would have a property(ticket) that shows the type of ticket he bought and the uantity for each, it will be an array i.e ["Regular_ticket_id 2", "vvip_ticket_id 1", "Vip_ticket_id 2"]
    await Promise.all(tickets.map(async(ticket)=>{return await EventGoer.findByIdAndUpdate(eventGoerId,{"$push": {"tickets": ticket}} )}))
    // Sending message to the frontend
    const ticket_details = tickets.map((ticket,i)=>{
        let ticket_id = ticket.split(" ")
        if(i != tickets.length - 1){
            return(` ${ticket_id[1]} ${ticket_id[0]}`)
        } else{
         return(` ${ticket_id[1]} ${ticket_id[0]}`)   
        }
        
    })
    console.log(`You have successfully bought${ticket_details}`)
    res.status(200).json({message: `You have successfully bought${ticket_details}`})

       /* sample of code to extract details
    let tickets = ["Regular_ticket_id 2", "vvip_ticket_id 1", "Vip_ticket_id 2"]


VM702:11 User bought 2 Regular_ticket_id, 1 vvip_ticket_id, 2 Vip_ticket_id
    */
      
    })
    /*
    {
  id: 3910185496,
  domain: 'test',
  status: 'success',
  reference: '1719154456332',
  receipt_number: null,
  amount: 30000000,
  message: null,
  gateway_response: 'Successful',
  paid_at: '2024-06-23T14:55:44.000Z',
  created_at: '2024-06-23T14:54:17.000Z',
  channel: 'card',
  currency: 'NGN',
  ip_address: '102.88.84.228',
  metadata: {
    tickets: "['regular_Ticket_id 2, vip_Ticket_id 2']",
    eventGoerId: '665c6218a9e308166a5a67ff'
  },
  log: {
    start_time: 1719154539,
    time_spent: 4,
    attempts: 1,
    errors: 0,
    success: true,
    mobile: false,
    input: [],
    history: [ [Object], [Object] ]
  },
  fees: 200000,
  fees_split: null,
  authorization: {
    authorization_code: 'AUTH_mjw9khyhht',
    bin: '408408',
    last4: '4081',
    exp_month: '12',
    exp_year: '2030',
    channel: 'card',
    card_type: 'visa ',
    bank: 'TEST BANK',
    country_code: 'NG',
    brand: 'visa',
    reusable: true,
    signature: 'SIG_KmuRj99FXG85YYTQVvOo',
    account_name: null,
    receiver_bank_account_number: null,
    receiver_bank: null
  },
  customer: {
    id: 171949164,
    first_name: null,
    last_name: null,
    email: 'anaguchidiebere@gmail.com',
    customer_code: 'CUS_201ru09ha4autvg',
    phone: null,
    metadata: null,
    risk_action: 'default',
    international_format_phone: null
  },
  plan: null,
  split: {},
  order_id: null,
  paidAt: '2024-06-23T14:55:44.000Z',
  createdAt: '2024-06-23T14:54:17.000Z',
  requested_amount: 30000000,
  pos_transaction_data: null,
  source: null,
  fees_breakdown: null,
  connect: null,
  transaction_date: '2024-06-23T14:54:17.000Z',
  plan_object: {},
  subaccount: {}
}
    */
module.exports = {createTicket, ticketPayment, verifyPayment, getAllTickets, getEventTickets}