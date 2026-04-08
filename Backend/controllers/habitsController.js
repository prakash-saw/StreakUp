const Habit = require('../models/Habit');
const User  = require('../models/user');

const getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id, isActive: true });
  res.json(habits);
};

const createHabit = async (req, res) => {
  try {
    const { title, description, frequency } = req.body;
    const habit = await Habit.create({ user: req.user._id, title, description, frequency });
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const markComplete = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.user.toString() !== req.user._id.toString())
      return res.status(404).json({ message: 'Habit not found' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const alreadyDone = habit.completedDates.some(
      d => new Date(d).setHours(0,0,0,0) === today.getTime()
    );
    if (alreadyDone) return res.status(400).json({ message: 'Already completed today' });

    habit.completedDates.push(new Date());
    habit.streak += 1;
    habit.points += 10;
    if (habit.streak > habit.longestStreak) habit.longestStreak = habit.streak;

    await habit.save();

    // Add points to user
    await User.findByIdAndUpdate(req.user._id, { $inc: { totalPoints: 10 } });

    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.user.toString() !== req.user._id.toString())
      return res.status(404).json({ message: 'Habit not found' });
    habit.isActive = false;
    await habit.save();
    res.json({ message: 'Habit removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getHabits, createHabit, markComplete, deleteHabit };