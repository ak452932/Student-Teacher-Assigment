const express = require('express');
const router = express.Router();
//const { createAssignment, getAssignments, updateStatus, deleteAssignment } = require('../controllers/assignmentController');
const assignmentController = require('../controllers/assignmentController');
const auth = require('../middleware/auth');

router.post('/', auth, assignmentController.createAssignment);
router.get('/', auth, assignmentController.getAssignments);
router.get('/published', auth, assignmentController.getPublishedAssignments);
router.patch('/:id/status', auth, assignmentController.updateStatus);
router.delete('/:id', auth, assignmentController.deleteAssignment);

module.exports = router;