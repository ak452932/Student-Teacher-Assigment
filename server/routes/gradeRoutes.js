const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

router.get('/', gradeController.getGrades);
router.post('/', gradeController.createGrade); // ✅ This line is required
router.delete('/:id', gradeController.deleteGrade);
router.post('/bulk-delete', gradeController.bulkDeleteGrades);
router.put('/:id', gradeController.updateGrade);

module.exports = router;