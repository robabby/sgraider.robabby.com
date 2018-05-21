const passport = require('passport');
// http://console.developers.google.com to set up a new Oauth app
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const flash = require('connect-flash');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

// passport.use(
//   new GoogleStrategy({
//     clientID: keys.googleClientID,
//     clientSecret: keys.googleClientSecret,
//     callbackURL: '/auth/google/callback',
//     proxy: true
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     // once you hit this segment of the process, the token is cached
//     // and google wont need to ask for permission again until expiration
//     const existingUser = await User.findOne({ googleId: profile.id })
//     if (existingUser) {
//       // we already have a record with the given profileId
//       return done(null, existingUser)
//     }
//     // make a new record
//     const user = await new User({ googleId: profile.id }).save();
//     done(null, user);
//
//   })
// );

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, async (err, user) => {
      // if there are any errors, return the error
      if (err)
        return done(err);
      // check to see if theres already a user with that email
      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      } else {
        // if there is no user with that email
        // create the user
        let newUser = new User();
        // set the user's local credentials
        newUser.local.email    = email;
        newUser.local.password = newUser.generateHash(password);
        // save the user
        newUser.save(function(err) {
          if (err)
              throw err;
          return done(null, newUser);
        });
      }
    });
  });
}));
