// const mongoose = require('mongoose');
// const CONFIG = require('../CONFIG/CONFIG');
//
// const { Schema } = mongoose;
//
// const blogOriginSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     index: true,
//     match: CONFIG.REGEX.username,
//   },
//   textPath: {
//     type: String,
//     required: true,
//   },
//   imagePath: {
//     type: String,
//     required: true,
//   },
//   videoPath: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });
//
// const blogReplySchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     index: true,
//     match: CONFIG.REGEX.username,
//   },
//   subject: {
//     blogOrigin_id: Schema.Types.ObjectId,
//     index: true,
//   },
//   textPath: {
//     type: String,
//     required: true,
//   },
//   imagePath: {
//     type: String,
//     required: true,
//   },
//   videoPath: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });
//
// module.exports.origin = mongoose.model('BlogOrigin', blogOriginSchema);
// module.exports.reply = mongoose.model('BlogReply', blogReplySchema);
