const passport = require('passport');

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

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // send to google to do the authentication
  app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

  // the callback after google has authorized the user
  app.get('/connect/google/callback',
    passport.authorize('google'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    console.log('/api/current_user');
    res.send(req.user);
  });
};
