const express = require('express');
const router = express.Router();
const teacherController = require('../controller/teacher.controller');

router.post('/register', teacherController.registerTeacher);
router.post('/login', teacherController.loginTeacher);
router.get('/stuff', teacherController.getAllStuff);

module.exports = router;
