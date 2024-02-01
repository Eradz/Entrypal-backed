const express = require("express")
const app = express()
const errorHandler = require("./Middleware/errorHandler.js")
const dotenv = require("dotenv").config()
const connectdb = require('./db.js')
const EventGoerRoute = require('./Endpoints/Authentication/EventGoers/Routes.js')
const EventCreatorsRoute = require('./Endpoints/Authentication/EventCreators/Routes.js')
const AsyncHandler = require("express-async-handler")
const port = process.env.PORT
const EventRoute = require("./Endpoints/Events/eventRoute.js")
const TicketRoute = require("./Endpoints/Tickets/ticketRoute.js")
const PaymentRoute = require("./utils/ticketPayment.js")
const cors = require("cors")
const passport = require("passport")

connectdb()
app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.get("/", (req, res)=>{
    res.send("Welcome")
})
app.get('/api/test', async (req,res) =>{
   
    // console.log("hey")
    // const hey = Object.keys(req.body)
    // const bodies = hey[0]
    // console.log(bodies)
    // CloudinarySingleupload(bodies)
    // res.status(200).json({message: bodies })
    // res.status(200).json({message: req.body})
    res.redirect('https://www.google.com')
})
app.use('/api/goer', EventGoerRoute )
app.use('/api/creator', EventCreatorsRoute )
app.use('/api/event', EventRoute)
app.use('/api/ticket', TicketRoute)
app.use('/api/payment', PaymentRoute)


require('./utils/googleAuthenticate.js')
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:3000',
        failureRedirect: 'http://localhost:3000/login'
}), (req, res) =>{
    res.end('Logged in')
});

app.use(errorHandler)
app.listen(`${port}`, ()=>{
    console.log(`app running on port ${port}`)
})