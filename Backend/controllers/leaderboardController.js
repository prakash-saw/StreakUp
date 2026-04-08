const User = require('../models/user');

const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select('username totalPoints')
      .sort({ totalPoints: -1 })
      .limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getLeaderboard };