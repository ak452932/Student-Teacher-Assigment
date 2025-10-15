const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const auth = require('../middleware/auth');

// Student routes
router.post('/', auth, submissionController.createSubmission);
router.get('/me', auth, submissionController.getMySubmissions);

// Teacher/Admin routes
router.get('/:id', auth, submissionController.getSubmissions);
router.patch('/:id/review', auth, submissionController.markReviewed);

module.exports = router;