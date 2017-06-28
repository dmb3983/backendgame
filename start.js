const express        = require('express');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`Error Connecting → ${err.message}`);
});

require('./models/Game');
require('./models/User');
require('./models/UserGame');
require('./models/Achievements');

const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});