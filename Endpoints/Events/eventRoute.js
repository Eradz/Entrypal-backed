const express = require("express")
const route = express.Router()
const {createEvent} = require("./eventController")


route.post("/create/:id", createEvent)

module.exports = route