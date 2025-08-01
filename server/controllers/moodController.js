const moodModel = require('../models/moodModel');

const getMoods = (req, res) => {
  moodModel.getAllMoods((err, results) => {
    if (err) {
      console.error('Error fetching moods:', err);
      return res.status(500).json({ message: 'Error fetching moods' });
    }
    res.json(results);
  });
};

module.exports = {
  getMoods
};
