const express = require("express")
const app = express()
const errorHandler = require("./middleware/errorHandler.js")
const dotenv = require("dotenv").config()
const connectdb = require('./db.js')
const loginRoute = require("./Endpoints/Authentication/Routes/login.js")
const signupRoute = require("./Endpoints/Authentication/Routes/signup.js")
const port = process.env.PORT

connectdb()
app.use(express.json())
app.use(errorHandler)
app.use('/api', loginRoute )
app.use('/api', signupRoute )
app.listen(`${port}`, ()=>{
    console.log(`app running on port ${port}`)
})