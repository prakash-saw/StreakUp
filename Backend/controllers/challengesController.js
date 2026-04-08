const Challenge = require('../models/Challenge');

const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({ isPublic: true })
      .populate('creator', 'username');
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createChallenge = async (req, res) => {
  try {
    const { title, description, targetDays, endDate, isPublic } = req.body;
    const challenge = await Challenge.create({
      title, description, targetDays, endDate, isPublic,
      creator: req.user._id,
      participants: [{ user: req.user._id }],
    });
    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const joinChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

    const already = challenge.participants.some(
      p => p.user.toString() === req.user._id.toString()
    );
    if (already) return res.status(400).json({ message: 'Already joined' });

    challenge.participants.push({ user: req.user._id });
    await challenge.save();
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

    const participant = challenge.participants.find(
      p => p.user.toString() === req.user._id.toString()
    );
    if (!participant) return res.status(400).json({ message: 'Not a participant' });

    participant.progress += 1;
    if (participant.progress >= challenge.targetDays) {
      participant.completed = true;
    }
    await challenge.save();
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getChallenges, createChallenge, joinChallenge, updateProgress };

