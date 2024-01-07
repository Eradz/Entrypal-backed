const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Events = new Schema({
    Event_name:{
        type: String,
        enum: ["Individual", "Business"],
        default: " "
    },
    Description:{
        type: String,
        required: [true, "Please enter your Full Name"]
    },
    Event_category:{
        type: String,
        enum: ["Arts Exhibition", "Business", "Birthday", "Conferences", "Corporate/Company Events", "Music Concerts", "Sports & Fitness", "Expositions", "Festivals & Fairs", "Community", "Fashion", "Food & Drinks"," Nightlife & Entertainment", "Kids & Family", "Religious Events", "Birthday", "Games & Hobbies", "Anniversaries", "Holidays", "Hangouts"],
        required: [true, "Please identify the Category of your event"]
    },
    Time:{
        type: String,
        required: [true, "Please enter the time in YY/MM/DD and time "]
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

const Event = mongoose.model("EventCreators", Events)
module.exports = Event 