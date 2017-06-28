const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');


var gameSchema = new mongoose.Schema({
  users: {
    type: String,
    required: '2 or more users are required'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema);