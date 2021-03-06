const passport = require('passport');
const request = require('request');
const qs = require('querystring');
const mongoose = require('mongoose');
const User = require('../models/User');
const keys = require('../config/keys');

module.exports = app => {
  // process the signup form
  app.post('/api/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        return res.send({ success : false, message : 'authentication failed' });
      }
      req.login(user, loginErr => {
        console.log(user);
        if (loginErr) {
          return next(loginErr);
        }
        return res.send(user);
      });
    })(req, res, next);
  });

  // process the login form
  app.post('/api/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        return res.send(false);
      }
      req.login(user, loginErr => {
        console.log(user);
        if (loginErr) {
          return next(loginErr);
        }
        return res.send(user);
      });
    })(req, res, next);
  });

  //  Process logout
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Get the current user
  app.get('/api/current_user', (req, res) => {
    // console.log('/api/current_user', req.user);
    res.send(req.user);
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  // app.get('/auth/connect/bungie', passport.authenticate('bungie-oauth2'), (req, res) => {
  //   console.log(res);
  // });
  app.get('/auth/connect/bungie', (req, res) => {
    let authorizationURL = `https://www.bungie.net/en/OAuth/Authorize?client_id=${keys.bungieClientId}&response_type=code`;
    res.redirect(authorizationURL);
  });
  app.get('/auth/connect/bungie/callback', async (req, res, done) => {
      let { user } = req;

      console.log("########## req ##########", req);
      console.log("########## req stuff ##########", req.query, req.url, req.user);

      let url = 'https://www.bungie.net/Platform/App/OAuth/Token/';
      let data = {
        client_id: keys.bungieClientId,
        client_secret: keys.bungieClientSecret,
        grant_type: 'authorization_code',
        code: req.query.code
      }

      request.post({ url, form: data }, async (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        const userData = JSON.parse(body);
        const userRecord = await User.findOne({ 'username' :  user.username });

        if (userRecord) {
          userRecord.bungie.membershipId = userData.membership_id;
          userRecord.bungie.accessToken = userData.access_token;
          userRecord.bungie.refreshToken = userData.refresh_token;

          await userRecord.save();
          console.log('/userRecord/ saved', userRecord);
        }
      });
      res.redirect('/settings');
    }
  );

  // Discord Signup
  app.get('/auth/discord', passport.authorize('discord'));
  app.get('/auth/discord/callback',
    passport.authorize('discord'),
    (req, res) => {
      res.redirect('/dashboard');
  });

  // Connect discord
  // app.get('/auth/connect/discord', passport.authenticate('discord'));
  // app.get('/auth/connect/discord/callback',
  //   passport.authenticate('discord'),
  //   (req, res) => {
  //     res.redirect('/settings');
  // });
};
