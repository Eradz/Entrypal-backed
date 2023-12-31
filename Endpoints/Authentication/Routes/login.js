const express = require("express")
const route = express.Router()

route.get("/login", (req,res)=>{
    res.send("Login Route")
})

module.exports = route