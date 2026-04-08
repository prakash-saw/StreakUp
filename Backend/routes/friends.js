const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/validation');
const { getFriends, sendRequest, acceptRequest } = require('../controllers/friendsController');

router.get('/', protect, getFriends);
router.post('/request', protect, sendRequest);
router.put('/accept', protect, acceptRequest);

module.exports = router;