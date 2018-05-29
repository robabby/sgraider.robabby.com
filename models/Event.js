const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = require('./User');

const eventSchema = new Schema({
  _owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  dateCreated: Date,
  dateModified: Date,
  eventDate: Date,
  eventType: String,
  eventTime: String,
  eventTitle: String, // name of the Raid, Strike or Crucible Playlist
  isPrestige: Boolean,
  fireteam: [userSchema],
  fireteamSize: { type: Number, default: 6 }
});

mongoose.model('raids', eventSchema);

module.exports = eventSchema;
