const passport = require("passport")
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const EventGoer = require("../Models/eventGoersSchema")
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://entrypalbackend.onrender.com/auth/google/callback",
    passReqToCallback   : true
  },
  async function verify(request, accessToken, refreshToken, profile, done) {
        const {id, displayName, email, given_name } = profile
        const existingUser = await EventGoer.findOne({googleId: id})
        const existingUseremail = await EventGoer.findOne({email})
        if(existingUser || existingUseremail){
         return  done(null, existingUser)
        } else{
          const user = await EventGoer.create({fullname: displayName, googleId: id, email, username: given_name  })
          return done(null, user)
        }
  }
));
/**
 *  provider: 'google',
  sub: '107653559879642991679',
  id: '107653559879642991679',
  displayName: 'Anagu Chidiebere',
  name: { givenName: 'Anagu', familyName: 'Chidiebere' },
  given_name: 'Anagu',
  family_name: 'Chidiebere',
  email_verified: true,
  verified: true,
  language: 'en',
  locale: undefined,
  email: 'anaguchidiebere@gmail.com',
  emails: [ { value: 'anaguchidiebere@gmail.com', type: 'account' } ],
  photos: [
    {
      value: 'https://lh3.googleusercontent.com/a/ACg8ocLyFFbvB4El2bXKxGTh0yyk6AOXhhmgCuSGO4QGgIDd6N0=s96-c',
      type: 'default'
    }
  ],
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocLyFFbvB4El2bXKxGTh0yyk6AOXhhmgCuSGO4QGgIDd6N0=s96-c',
  _raw: '{\n' +
    '  "sub": "107653559879642991679",\n' +
    '  "name": "Anagu Chidiebere",\n' +
    '  "given_name": "Anagu",\n' +
    '  "family_name": "Chidiebere",\n' +
    '  "picture": "https://lh3.googleusercontent.com/a/ACg8ocLyFFbvB4El2bXKxGTh0yyk6AOXhhmgCuSGO4QGgIDd6N0\\u003ds96-c",\n' +
    '  "email": "anaguchidiebere@gmail.com",\n' +
    '  "email_verified": true,\n' +
    '  "locale": "en"\n' +
    '}',
  _json: {
    sub: '107653559879642991679',
    name: 'Anagu Chidiebere',
    given_name: 'Anagu',
    family_name: 'Chidiebere',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocLyFFbvB4El2bXKxGTh0yyk6AOXhhmgCuSGO4QGgIDd6N0=s96-c',
    email: 'anaguchidiebere@gmail.com',
    email_verified: true,
    locale: 'en'
  }
}
 */