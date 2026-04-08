const express = require('express');
const router = express.Router();
const { getChallenges, createChallenge, joinChallenge, updateProgress } = require('../controllers/challengesController');
const { protect } = require('../middleware/validation');

router.get('/', protect, getChallenges);
router.post('/', protect, createChallenge);
router.put('/:id/join', protect, joinChallenge);
router.put('/:id/progress', protect, updateProgress);

module.exports = router;