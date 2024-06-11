const Student = require('../models/student.model');
const Teacher = require('../models/teacher.model');


const createStudent = async (studentData) => {
    try {
      const student = new Student(studentData);
      await student.save();
      
      const teacher = await Teacher.findById(studentData.teacher);
      if (!teacher) {
        throw new Error('Teacher not found');
      }
      teacher.students.push(student._id);
      await teacher.save();
  
      return student;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const updateStudent = async (id, studentData) => {
    try {
      const student = await Student.findByIdAndUpdate(id, studentData, { new: true });
      return student;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const deleteStudent = async (id) => {
    try {
      await Student.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const getStudentsByTeacher = async (teacherId) => {
    try {
      const students = await Student.find({ teacher: teacherId });
      return students;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  module.exports = {
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentsByTeacher,
  };
