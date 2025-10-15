const Submission = require('../models/Submission');
const mongoose = require('mongoose');

// POST /api/submissions → for student to submit an answer
exports.createSubmission = async (req, res) => {
  try {
    const { assignment, answer } = req.body;

    if (!assignment || !answer) {
      return res.status(400).json({ message: 'Assignment and answer are required.' });
    }

    const submission = new Submission({
      assignment: new mongoose.Types.ObjectId(assignment),
      student: req.user.id,
      answer,
    });

    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ message: 'Submission failed' });
  }
};

// GET /api/submissions/:id → for teacher/admin to view all submissions for an assignment
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ assignment: req.params.id })
      .populate('student', 'name email');
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/submissions/me → for student to view their own submissions
exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user.id })
      .populate({
        path: 'assignment',
        match: { status: 'Published' },
      });

    const filtered = submissions.filter(sub => sub.assignment !== null);
    res.json(filtered);
  } catch (error) {
    console.error('Error fetching student submissions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/submissions/:id/review → mark a submission as reviewed
exports.markReviewed = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.reviewed = true;
    await submission.save();
    res.json(submission);
  } catch (error) {
    console.error('Error marking reviewed:', error);
    res.status(500).json({ message: 'Server error' });
  }
};