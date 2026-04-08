const User = require('../models/user');

const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('friends', 'username email totalPoints');
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sendRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    const targetUser = await User.findById(userId);
    if (!targetUser) return res.status(404).json({ message: 'User not found' });

    if (targetUser.friendRequests.includes(req.user._id))
      return res.status(400).json({ message: 'Request already sent' });

    targetUser.friendRequests.push(req.user._id);
    await targetUser.save();
    res.json({ message: 'Friend request sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user.friendRequests.includes(userId))
      return res.status(400).json({ message: 'No request from this user' });

    user.friends.push(userId);
    user.friendRequests = user.friendRequests.filter(id => id.toString() !== userId);
    await user.save();

    await User.findByIdAndUpdate(userId, { $push: { friends: req.user._id } });
    res.json({ message: 'Friend added' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getFriends, sendRequest, acceptRequest };