const express = require("express")
const route = express.Router()
const {signupController, loginController} = require('./Controllers')


route.post("/signup", signupController)
route.post("/login", loginController)


module.exports = route