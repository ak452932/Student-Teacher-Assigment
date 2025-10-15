const Assignment = require('../models/Assignment');

// Create assignment (teacher only)
exports.createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment({ ...req.body, createdBy: req.user.id });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating assignment' });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const statusFilter = req.query.status; // e.g., ?status=Published
    const query = { createdBy: req.user.id };
    if (statusFilter) {
      query.status = statusFilter;
    }

    const assignments = await Assignment.find(query);
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching assignments' });
  }
};

// Get published assignments (student view)
exports.getPublishedAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ status: 'Published' });
    res.json(assignments);
    console.log("Hello i am published assignments",assignments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching published assignments' });
  }
};

// Update assignment status (teacher only)
exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    if (
      (assignment.status === 'Draft' && status === 'Published') ||
      (assignment.status === 'Published' && status === 'Completed')
    ) {
      assignment.status = status;
      await assignment.save();
      res.json(assignment);
    } else {
      res.status(400).json({ message: 'Invalid status transition' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
};

// Delete assignment (only if still a draft)
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    if (assignment.status !== 'Draft') {
      return res.status(400).json({ message: 'Only draft assignments can be deleted' });
    }

    await assignment.deleteOne();
    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting assignment' });
  }
};