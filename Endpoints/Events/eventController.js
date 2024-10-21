const AsyncHandler = require("express-async-handler")
const Event = require("../../Models/EventSchema")
const eventCreators = require("../../Models/eventCreatorsSchema")

//@desc Create an Event
const createEvent = AsyncHandler(async(req, res) =>{
   const {Event_name, Description,Event_category, Time,Address,Socials,Primary_flier, Secondary_fliers} = req.body
   const creator_id = req.params.id
   const user = await eventCreators.findById(creator_id)
   if(!user){
      res.status(401)
      throw new Error("Event Creator does not exist")
   }else{
      const event = await Event.create({Event_creator_id: creator_id, Event_name, Description,Event_category, Time,Address,Socials, Primary_flier, Secondary_fliers})
      res.status(200).json({message: "Event has been Successfully created", event})
   }
})

module.exports = {createEvent}