const express = require("express")
const route = express.Router()
const {signupControllerEventGoers, loginControllerEventGoers} = require('./Controllers')

route.post("/signup", signupControllerEventGoers)
route.post("/login", loginControllerEventGoers)



module.exports = route