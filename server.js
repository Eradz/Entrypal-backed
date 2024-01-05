const express = require("express")
const app = express()
const errorHandler = require("./middleware/errorHandler.js")
const dotenv = require("dotenv").config()
const connectdb = require('./db.js')
const authenticationRoute = require("./Endpoints/Authentication/Routes.js")
const EventGoerRoute = require('./Endpoints/Authentication/EventGoers/Routes.js')
const EventCreatorsRoute = require('./Endpoints/Authentication/EventCreators/Routes.js')
const AsyncHandler = require("express-async-handler")
const port = process.env.PORT



connectdb()
app.use(express.json())
// app.get('/api/test', AsyncHandler((req,res) =>{
//     const token = 'wrong'
//         if(token === 'wrong'){
//             res.status(404);
//             throw new Error("Error detected")
//         }
// }))
app.use('/api', authenticationRoute)
app.use('/api/goer', EventGoerRoute )
app.use('/api/creator', EventCreatorsRoute )
app.use(errorHandler)
app.listen(`${port}`, ()=>{
    console.log(`app running on port ${port}`)
})