const express = require("express")
const route = express.Router()
const {signupControllerEventGoers, 
    loginControllerEventGoers,
    getAllEventGoers,
    getSingleEventGoers, 
    deleteEventGoer,
    verifyUser
} = require('./Controllers')

route.post("/signup", signupControllerEventGoers)
route.post("/login", loginControllerEventGoers)
route.post("/verifyotp/:id", verifyUser)
route.get("/users", getAllEventGoers)
route.get("/user/:id", getSingleEventGoers)
route.delete("/deleteuser/:id", deleteEventGoer)



module.exports = route