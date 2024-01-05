const express = require("express")
const route = express.Router()
const {signupControllerEventCreators, loginControllerEventCreators} = require('./Controllers')

route.post("/signup",signupControllerEventCreators)
route.post("/login", loginControllerEventCreators)



module.exports = route