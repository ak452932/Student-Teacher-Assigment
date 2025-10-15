const Grade = require('../models/Grade');

exports.createGrade = async (req, res) => {
  try {
    const { name, subject, mark } = req.body;
    const grade = new Grade({ name, subject, mark });
    await grade.save();
    res.status(201).json(grade);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create grade' });
  }
};

exports.getGrades = async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch grades' });
  }
};

exports.deleteGrade = async (req, res) => {
  try {
    await Grade.findByIdAndDelete(req.params.id);
    res.json({ message: 'Grade deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete grade' });
  }
};

exports.bulkDeleteGrades = async (req, res) => {
  try {
    const { ids } = req.body;
    await Grade.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Grades deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Bulk delete failed' });
  }
};
exports.updateGrade = async (req, res) => {
  try {
    const { name, subject, mark } = req.body;
    const grade = await Grade.findByIdAndUpdate(req.params.id, { name, subject, mark }, { new: true });
    res.json(grade);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update grade' });
  }
};