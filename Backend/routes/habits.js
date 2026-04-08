const express = require('express');
const router = express.Router();
const { getHabits, createHabit, markComplete, deleteHabit } = require('../controllers/habitsController');
const { protect } = require('../middleware/validation');

router.get('/', protect, getHabits);
router.post('/', protect, createHabit);
router.put('/:id/complete', protect, markComplete);
router.delete('/:id', protect, deleteHabit);

module.exports = router;