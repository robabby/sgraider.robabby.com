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
          return res.send({ success : false, message : 'Login failed' });
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

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/stacks');
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
