const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/validation');
const { getLeaderboard } = require('../controllers/leaderboardController');

router.get('/', protect, getLeaderboard);

module.exports = router;