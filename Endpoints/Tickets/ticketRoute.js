const express = require("express")
const AsyncHandler = require("express-async-handler")
const { createTicket, ticketPayment, verifyPayment, getAllTickets, getEventTickets } = require("./ticketController")
const router = express.Router()

router.get('/', getAllTickets)
router.get('/:Event_id', getEventTickets)
router.post('/create/:id', createTicket)
router.post('/initializepayment/:eventGoerId', ticketPayment)
router.get('/verifypayment/:reference', verifyPayment)
router.put('/', AsyncHandler((req, res) =>{
    res.status(200).json({message: "in Update Ticket route"})
}))
router.delete('/', AsyncHandler((req, res) =>{
    res.status(200).json({message: "in Delete Ticket route"})
}))

module.exports = router