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
const session = require('express-session')

app.set("view engine", "ejs");
connectdb()
app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.static("public")); 
app.use(session({
  secret: 'suii',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.authenticate('session'))
app.use(passport.initialize())
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.get("/", (req, res)=>{
    //  res.send("welcome")
     res.render("example")
})
app.get("/success", (req, res)=>{
    //  res.send("welcome")
    res.redirect("https://www.entrypalapp.com")
})
app.get("/login", (req, res)=>{
    //  res.send("welcome")
     res.redirect("https://google.com")
})
app.get("/logout",(req,res)=>{
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  })
})
app.use('/api/goer', EventGoerRoute )
app.use('/api/creator', EventCreatorsRoute )
app.use('/api/event', EventRoute)
app.use('/api/ticket', TicketRoute)
app.use('/api/payment', PaymentRoute)


require('./utils/googleAuthenticate.js')
app.get('/auth/google',passport.authenticate('google', { scope:[ 'email', 'profile' ] }));

app.get('/auth/google/callback', 
passport.authenticate('google', {
    failureRedirect: '/login'
  }), (req,res)=>{
    res.redirect("https://entrypalapp.com")
  })


app.use(errorHandler)
app.listen(`${port}`, ()=>{
    console.log(`app running on port ${port}`)
})