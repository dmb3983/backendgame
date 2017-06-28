const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
  achievement: {
    type: [String],
    trim: true,
    required: '2 or more users are required'
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Achievements', achievementSchema);