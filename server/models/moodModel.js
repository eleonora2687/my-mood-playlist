const db = require('../config/db');

const getAllMoods = (callback) => {
  db.query('SELECT * FROM moods', callback);
};

module.exports = {
  getAllMoods
};
