const AsyncHandler = require("express-async-handler")
//@desc Create an Event
const createEvent = AsyncHandler(async(req, res) =>{
    res.send("Create Event")
})

module.exports = {createEvent}