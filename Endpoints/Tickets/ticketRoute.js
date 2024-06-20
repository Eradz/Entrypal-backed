const express = require("express")
const AsyncHandler = require("express-async-handler")
const { createTicket, ticketPayment, verifyPayment } = require("./ticketController")
const router = express.Router()

router.get('/', AsyncHandler((req, res) =>{
    res.status(200).json({message: "in Ticket route"})
}))
router.post('/create/:id', createTicket)
router.post('/initializepayment/:eventGoerId', ticketPayment)
router.post('/verifypayment', verifyPayment)
router.put('/', AsyncHandler((req, res) =>{
    res.status(200).json({message: "in Update Ticket route"})
}))
router.delete('/', AsyncHandler((req, res) =>{
    res.status(200).json({message: "in Delete Ticket route"})
}))

module.exports = router