const studentService = require('../services/student.service');

exports.createStudent = async (req, res) => {
    try {
      const studentData = { ...req.body, teacher: req.teacher };
      const student = await studentService.createStudent(studentData);
      res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.updateStudent = async (req, res) => {
    try {
      const student = await studentService.updateStudent(req.params.id, req.body);
      res.status(200).json({ message: 'Student updated successfully', student });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.deleteStudent = async (req, res) => {
    try {
      await studentService.deleteStudent(req.params.id);
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.getStudentsByTeacher = async (req, res) => {
    try {
      const students = await studentService.getStudentsByTeacher(req.teacher);
      res.status(200).json({ students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };