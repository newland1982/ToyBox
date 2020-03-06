const mongoose = require('mongoose');
const CONFIG = require('../CONFIG/CONFIG');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
    match: CONFIG.REGEX.username,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
