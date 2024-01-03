const express = require("express")
const route = express.Router()
const verify = require("../../middleware/verifyJwt")
const {signupController, loginController, userController} = require('./Controllers')

route.get("/users", verify, userController)
route.post("/signup", signupController)
route.post("/login", loginController)


module.exports = route