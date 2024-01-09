const express = require("express")
const app = express()
const errorHandler = require("./middleware/errorHandler.js")
const dotenv = require("dotenv").config()
const connectdb = require('./db.js')
const EventGoerRoute = require('./Endpoints/Authentication/EventGoers/Routes.js')
const EventCreatorsRoute = require('./Endpoints/Authentication/EventCreators/Routes.js')
const AsyncHandler = require("express-async-handler")
const port = process.env.PORT
const EventRoute = require("./Endpoints/Events/eventRoute.js")


connectdb()
app.use(express.json())
// app.get('/api/test', AsyncHandler((req,res) =>{
//     const token = 'wrong'
//         if(token === 'wrong'){
//             res.status(404);
//             throw new Error("Error detected")
//         }
// }))
app.use('/api/goer', EventGoerRoute )
app.use('/api/creator', EventCreatorsRoute )
app.use('/api/event', EventRoute)
app.use(errorHandler)
app.listen(`${port}`, ()=>{
    console.log(`app running on port ${port}`)
})