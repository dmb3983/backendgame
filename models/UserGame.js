const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');


const userGameSchema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.ObjectId,
    ref: 'Game',
    required: 'A game number is required'
  },
  users: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    kills: String,
    headshots: String,
    achievements: String
    
  },
  created: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

function autopopulate(next) {
  this.populate('users');
  next();
}

function autopopulate(next) {
  this.populate('game');
  next();
}

userGameSchema.pre('find', autopopulate);
userGameSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('UserGame', userGameSchema);