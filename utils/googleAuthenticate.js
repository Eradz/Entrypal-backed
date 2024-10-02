const passport = require("passport")
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const EventGoer = require("../Models/eventGoersSchema")
const sendEmail = require("../utils/sendEmail")
const paths = require('path')
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://entrypalbackend.onrender.com/auth/google/callback" ,
    passReqToCallback   : true
  },
  async function verify(request, accessToken, refreshToken, profile, done) {
        const {id, displayName, email, given_name } = profile
        const existingUser = await EventGoer.findOne({googleId: id})
        const existingUseremail = await EventGoer.findOne({email})
        if(existingUser || existingUseremail){
         return  done(null, existingUseremail)
        } else{
          const user = await EventGoer.create({fullname: displayName, googleId: id, email, username: given_name, verified: true })
          sendEmail(email, displayName , "Welcome to Ticketing made easy", '',  paths.join( __dirname, "../views/EventGoerSignup.ejs"))
          return done(null, user)
        }
  }
));