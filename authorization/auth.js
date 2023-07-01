const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,

    // For local testing
    // callbackURL: "http://localhost:8080/google/callback",
    callbackURL: "https://restume.onrender.com/google/callback",
    passReqToCallback   : true
},

    // This is where you'd add a user to the DB
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile); 
}
));

passport.serializeUser(function(user, done) {
    done(null, user); 
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Function to check if user is logged in
function isLoggedIn(req, res, next) {
    req.user ? next(): res.sendStatus(401);
  }

  module.exports = { isLoggedIn };