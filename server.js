const express = require("express")
const app = express()
const errorHandler = require("./Middleware/errorHandler.js")
const dotenv = require("dotenv").config()
const connectdb = require('./db.js')
const EventGoerRoute = require('./Endpoints/Authentication/EventGoers/Routes.js')
const EventCreatorsRoute = require('./Endpoints/Authentication/EventCreators/Routes.js')
const port = process.env.PORT
const EventRoute = require("./Endpoints/Events/eventRoute.js")
const TicketRoute = require("./Endpoints/Tickets/ticketRoute.js")
const PaymentRoute = require("./utils/ticketPayment.js")
const cors = require("cors")
const path = require('node:path')
const passport = require("passport")

app.set("view engine", "ejs");
connectdb()
app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.static("public")); 
app.get("/", (req, res)=>{
    //  res.send("welcome")
     res.render("welcome")
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

app.get('/auth/google/callback', 
// passport.authenticate('google', {
//     successRedirect: '/success',
//     failureRedirect: '/login'
//   })
(req,res)=>{
    res.redirect("/success")
}
  );;

app.use(errorHandler)
app.listen(`${port}`, ()=>{
    console.log(`app running on port ${port}`)
})