const express = require("express")
const route = express.Router()

route.get("/signup", (req,res)=>{
    res.send("Signup Route")
})

module.exports = route