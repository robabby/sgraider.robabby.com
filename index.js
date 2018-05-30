const keys = require('./config/keys');
if (process.env.NODE_ENV === 'production') {
  // const path = require('path')
  // require('dotenv').config({ path: path.join(__dirname, '.env') })
  console.log('#### KEYS ####', keys);
}
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
require('./models/User');
require('./services/passport');
require('./services/discord');


mongoose.connect(keys.mongoURI, (err, db) => {
  if (err) {
      console.log('err', err);

  }
  else { console.log('Database Connected') }
});

const app = express();

app.use(bodyParser.json())
app.use(
  cookieSession({
    // configuration object
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days broken down to ms
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/authRoutes')(app);
// require('./routes/stackRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Serve up production assets
  app.use(express.static('client/build'));

  // Serve index.html if unrecognized route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

const PORT = process.env.SPACEGHOST_PORT || 5000;
app.listen(PORT);
