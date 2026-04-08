const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  frequency:   { type: String, enum: ['daily', 'weekly'], default: 'daily' },
  streak:      { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  completedDates: [{ type: Date }],
  isActive:    { type: Boolean, default: true },
  points:      { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);