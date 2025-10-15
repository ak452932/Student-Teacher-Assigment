const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  name: String,
  subject: String,
  mark: Number,
});

module.exports = mongoose.model('Grade', gradeSchema);