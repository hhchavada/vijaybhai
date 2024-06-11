const teacherService = require('../services/teacher.service');

exports.registerTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.registerTeacher(req.body);
    res.status(201).json({ message: 'Teacher registered successfully', teacher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, teacher } = await teacherService.loginTeacher(email, password);
    res.status(200).json({ token, teacher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllStuff = async (req, res) => {
  try {
    const teachers = await teacherService.getAllStuff();
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};