const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Events = new Schema({
    Event_creator_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "EventCreators"
    },
    Event_name:{
        type: String,
       required: [true, "Please enter the event name"]
    },
    Description:{
        type: String,
        required: [true, "Please enter the event Description"]
    },
    Event_category:{
        type: String,
        enum: {values: ["Arts Exhibition", "Business", "Birthday", "Conferences", "Corporate/Company Events", "Music Concerts", "Sports & Fitness", "Expositions", "Festivals & Fairs", "Community", "Fashion", "Food & Drinks"," Nightlife & Entertainment", "Kids & Family", "Religious Events", "Birthday", "Games & Hobbies", "Anniversaries", "Holidays", "Hangouts"] ,message: '{VALUE} is not supported' },
        required: [true, "Please identify a Valid Category for your event"]
    },
    Time:{
        type: String,
        required: [true, "Please enter the time in DD/MM/YY and time "]
    },
    Address:{
        type: String,
        required: [true, "Please enter the location of the Event"]
    },
   Socials:{
        type: String,
        required: [true, "Please enter the socials needed for the event"]
    },
    Primary_flier:{
        type: String,
        required: [true, "Please add a Primary image"]
    },
    Secondary_fliers:{
        type: String,
        required: [true, "Please add a Secondary Image"]
    },
},{
    timestamps: true
})

const Event = mongoose.model("Events", Events)
module.exports = Event 