const express = require("express")
const route = express.Router()
const {signupController, loginController, userController} = require('./Controllers')

route.get("/users", userController)
route.post("/signup", signupController)
route.post("/login", loginController)


module.exports = route