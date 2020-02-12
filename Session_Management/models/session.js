const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const SessionSchema = mongoose.Schema({
  email: { type: String },
  tx_id: { type: String },
  year: { type: String },
  month: { type: String },
  day: { type: String },
  radar: { type: String }
});

SessionSchema.plugin(timestamps);

module.exports = mongoose.model('Session', SessionSchema);
