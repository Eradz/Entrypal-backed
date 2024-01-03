const express = require("express")
const app = express()
const errorHandler = require("./middleware/errorHandler.js")
const dotenv = require("dotenv").config()
const connectdb = require('./db.js')
const authenticationRoute = require("./Endpoints/Authentication/Routes.js")
const port = process.env.PORT

connectdb()
app.use(express.json())
app.use(errorHandler)
app.use('/api', authenticationRoute )
app.listen(`${port}`, ()=>{
    console.log(`app running on port ${port}`)
})