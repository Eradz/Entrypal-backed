const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const connectdb = require('./db.js')
const loginRoute = require("./Endpoints/Authentication/Routes/login.js")
const signupRoute = require("./Endpoints/Authentication/Routes/signup.js")
connectdb()

app.use('/api', loginRoute )
app.use('/api', signupRoute )
app.listen("3000", ()=>{
    console.log("app running on port 3000")
})