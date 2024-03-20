const express = require("express")
const route = express.Router()
const {signupControllerEventCreators, 
    loginControllerEventCreators,
    getAllEventCreators, 
    deleteEventCreator
} = require('./Controllers')

route.post("/signup",signupControllerEventCreators)
route.post("/login", loginControllerEventCreators)
route.get("/users", getAllEventCreators)
route.delete("/deleteuser/:id", deleteEventCreator)



module.exports = route