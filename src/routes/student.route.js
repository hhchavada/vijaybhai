const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller');
const authenticateTeacher = require('../healpers/auth.middleware');

router.post('/students', authenticateTeacher, studentController.createStudent);
router.put('/students/:id', authenticateTeacher, studentController.updateStudent);
router.delete('/students/:id', authenticateTeacher, studentController.deleteStudent);
router.get('/students', authenticateTeacher, studentController.getStudentsByTeacher);
module.exports = router;
