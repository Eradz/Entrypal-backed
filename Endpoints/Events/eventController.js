const AsyncHandler = require("express-async-handler")
const Event = require("../../Models/EventSchema")
const eventCreators = require("../../Models/eventCreatorsSchema")
const uploadImage = require("../../utils/cloudinary")

//@desc Create an Event
const createEvent = async(req, res) =>{
   // const {Event_creator_id, Event_name, Description,Event_category, Time,Address,Socials, Primary_flier, Secondary_fliers} = req.body
   // const creator_id = req.params.id
   // const user = eventCreators.findById(creator_id)
   // if(!user){
   //    res.status(400)
   //    throw new Error("Event Creator does not exist")
   // }
   // const image = await uploadImage(req.files.image.data)
   // const event = Event.create({Event_creator_id, Event_name, Description,Event_category, Time,Address,Socials, Primary_flier:image.secure_url, Secondary_fliers})
   const test = req.body
   console.log(test)
   res.status(200).json({suii:test})

}

module.exports = {createEvent}