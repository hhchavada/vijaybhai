const Teacher = require('../models/teacher.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerTeacher = async (teacherData) => {
    try {
      const teacher = new Teacher(teacherData);
      await teacher.save();
      return teacher;
    } catch (error) {
      throw new Error(error.message);
    }
  };
 
  const loginTeacher = async (email, password) => {
    try {
      const teacher = await Teacher.findOne({ email });
      if (!teacher) {
        throw new Error('Invalid credentials');
      }
      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ id: teacher._id }, 'test', { expiresIn: '1h' });
      return { token, teacher };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const getAllStuff = async () => {
    try {
      const teachers = await Teacher.find().populate('students');
      return teachers;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  module.exports = {
    registerTeacher,
    loginTeacher,
    getAllStuff,
    
  };
