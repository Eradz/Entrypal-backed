const express = require("express")
const route = express.Router()
const verify = require("../../middleware/verifyJwt")
const {signupControllerEventGoers, loginControllerEventGoers, getAllUsers, getSingleUser} = require('./Controllers')

route.get("/users", verify, getAllUsers)
route.get("/users/:id", getSingleUser)
route.post("/signup", signupControllerEventGoers)
route.post("/login", loginControllerEventGoers)



module.exports = route