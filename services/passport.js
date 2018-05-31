const passport = require('passport');
// http://console.developers.google.com to set up a new Oauth app
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const BungieOAuth2Strategy = require('passport-bungie-oauth2').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const flash = require('connect-flash');
const refresh = require('passport-oauth2-refresh');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use(
  'local-signup',
  new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  (req, username, password, done) => {
    console.log(username, password, req.body);
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(async () => {
      console.log('process.nextTick');
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      const existingUser = await User.findOne({ 'username' :  username });

      if (existingUser) {
        console.log('User exists');
        // we already have a record with the given profileId
        return done(null, existingUser)
      }

      // make a new record
      const newUser = new User();
      newUser.username = username;
      newUser.local.email = req.body.email;
      newUser.local.password = newUser.generateHash(password);


      await newUser.save();

      console.log('user saved', newUser);

      done(null, newUser);
    });
  })
);


// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return done(err);

        // if no user is found, return the message
        if (!user)
            return done(null, false, { loginMessage: 'No user found.' }); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
            return done(null, false, { loginMessage: 'Oops! Wrong password.' }); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
    });

}));

// =========================================================================
// DISCORD =================================================================
// =========================================================================

passport.use(new DiscordStrategy({
    clientID: keys.discordClientId,
    clientSecret: keys.discordClientSecret,
    callbackURL: `/auth/discord/callback`,
    scope: ['identify', 'email'],
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    console.log('/req.user/', req.user);
    console.log('/discord.profile/', profile);

    const user = await User.findOne({ 'username' :  req.user.username });

    if (user) {
      user.discord.id = profile.id;
      user.discord.username = profile.username;
      user.discord.email = profile.email;
      user.discord.accessToken = profile.accessToken;
      user.discord.refreshToken = refreshToken;

      await user.save();
      console.log('/user/ saved', user);

      return done(null, user);
    }

    // No user found
    return done(null, false, { loginMessage: 'User not found.' });
}));

// =========================================================================
// BUNGIE ==================================================================
// =========================================================================

passport.use(new BungieOAuth2Strategy({
    clientID: keys.bungieClientId,
    callbackURL: `${keys.redirectDomain}auth/connect/bungie/callback`,
    authorizationURL: `https://www.bungie.net/en/OAuth/Authorize?client_id=${keys.bungieClientId}&response_type=code`
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    console.log('/req.user/', req.user);
    console.log('/bungie.profile/', profile);

    const user = await User.findOne({ 'username' :  req.user.username });

    if (user) {
      user.bungie.membershipId = profile.membershipId;
      user.bungie.accessToken = profile.accessToken;
      user.bungie.refreshToken = refreshToken;

      await user.save();
      console.log('/user/ saved', user);

      return done(null, user);
    }

    // No user found
    return done(null, false, { loginMessage: 'User not found.' });

    // User.findOrCreate({ bungie: { membershipId: profile.membershipId } }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

// =========================================================================
// GOOGLE SIGNUP ===========================================================
// =========================================================================

// passport.use(
//   new GoogleStrategy({
//     clientID: keys.googleClientID,
//     clientSecret: keys.googleClientSecret,
//     callbackURL: '/auth/google/callback',
//     proxy: true,
//     passReqToCallback: true
//   },
//   async (req, accessToken, refreshToken, profile, done) => {
//     if (!req.user) {
//       console.log(profile.emails[0]);
//       // once you hit this segment of the process, the token is cached
//       // and google wont need to ask for permission again until expiration
//       const existingUser = await User.findOne({ google: { id: profile.id } });
//       if (existingUser) {
//         // we already have a record with the given profileId
//         return done(null, existingUser)
//       }
//       // make a new record
//       const user = await new User({ google: { id: profile.id } }).save();
//       done(null, user);
//     } else {
//       const user = req.user;
//       user.google.id = preofile.id;
//
//       user.save(function(err) {
//         if (err)
//           throw err;
//         return done(null, user);
//       });
//     }
//   })
// );
