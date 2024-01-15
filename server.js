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
const cors = require("cors")
const CloudinarySingleupload = require("./utils/cloudinary.js")
const passport = require("passport")

connectdb()
app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.post('/api/test', async (req,res) =>{
    // const token = 'wrong'
    //     if(token === 'wrong'){
    //         res.status(404);
    //         throw new Error("Error detected")
    //     }
   
   
    // console.log("hey")
    // const hey = Object.keys(req.body)
    // const bodies = hey[0]
    // console.log(bodies)
    // CloudinarySingleupload(bodies)
    // res.status(200).json({message: bodies })


    console.log(req.files)
})
app.use('/api/goer', EventGoerRoute )
app.use('/api/creator', EventCreatorsRoute )
app.use('/api/event', EventRoute)

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