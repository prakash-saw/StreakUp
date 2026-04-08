const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  creator:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{
    user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    progress:  { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  }],
  targetDays:  { type: Number, default: 30 },
  startDate:   { type: Date, default: Date.now },
  endDate:     { type: Date },
  isPublic:    { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);