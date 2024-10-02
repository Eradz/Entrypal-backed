const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const errorHandler = require("./Middleware/errorHandler.js")
const dotenv = require("dotenv").config()
const connectdb = require('./db.js')
const EventGoerRoute = require('./Endpoints/Authentication/EventGoers/Routes.js')
const EventCreatorsRoute = require('./Endpoints/Authentication/EventCreators/Routes.js')
const port = process.env.PORT
const EventRoute = require("./Endpoints/Events/eventRoute.js")
const TicketRoute = require("./Endpoints/Tickets/ticketRoute.js")
const ForgotPasswordRoute = require("./Endpoints/Authentication/ForgotPassword/forgotPassword.js")
const cors = require("cors")
const path = require('node:path')
const passport = require("passport")
const session = require('express-session')
const qrCodeGenerator = require("./utils/QRcode.js")
const {sendEmail} = require("./utils/sendEmail.js")
const { sendCookies } = require("./utils/cookies.js")
const jwt = require("jsonwebtoken")
app.set("view engine", "ejs");
connectdb()
app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser())
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
     res.send("welcome")
})

app.get('/qrcode', async(req,res)=>{
  const result = await qrCodeGenerator("Chidiebere")
  res.send(result)
})

app.get("/login", (req, res)=>{
     res.redirect("https://www.entrypalapp.com/authentication/login")
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
app.use('/api/forgotpassword', ForgotPasswordRoute)
// app.use('/api/payment', PaymentRoute)


require('./utils/googleAuthenticate.js')
app.get('/auth/google',passport.authenticate('google', { scope:[ 'email', 'profile' ] }));
app.get('/auth/google/callback', 
passport.authenticate('google', {
    failureRedirect: '/login'
  }), (req,res)=>{
    sendCookies('GIId', jwt.sign({userId: req.user._id}, process.env.JWT_SECRET), {expiresIn: "7d"}, res )
    res.redirect(`https://www.entrypalapp.com/dashboard`)
  })
app.use(errorHandler)
app.listen(`${port}`, ()=>{
    console.log(`app running on port ${port}`)
})