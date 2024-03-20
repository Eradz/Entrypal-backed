const express = require("express")
const route = express.Router()
const {signupControllerEventGoers, 
    loginControllerEventGoers,
    getAllEventGoers, 
    deleteEventGoer
} = require('./Controllers')

route.post("/signup", signupControllerEventGoers)
route.post("/login", loginControllerEventGoers)
route.get("/users", getAllEventGoers)
route.delete("/deleteuser/:id", deleteEventGoer)



module.exports = route