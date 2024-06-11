const Teacher = require('../models/teacher.model');
const jwt = require('jsonwebtoken');

const authenticateTeacher = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
    //   console.log('Token:', token); // Debugging statement
  
      
      const decoded = jwt.decode(token);
    //   console.log('Manually Decoded:', decoded); // Debugging statement
  
      if (!decoded) {
        throw new Error('Invalid token');
      }
  
    
      jwt.verify(token, 'test', (err, decoded) => {
        if (err) {
          console.log('Error in token verification:', err); // Debugging statement
          throw new Error('Token verification failed');
        }
  
        console.log('Decoded:', decoded); // Debugging statement
  
        Teacher.findById(decoded.id).then((teacher) => {
          if (!teacher) {
            throw new Error('Teacher not found');
          }
  
          req.teacher = teacher._id;  // Set the teacher ID in request object
          next();
        }).catch((err) => {
          console.log('Error in finding teacher:', err); // Debugging statement
          res.status(401).json({ error: 'Please authenticate.' });
        });
      });
    } catch (error) {
      res.status(401).json({ error: 'Please authenticate.' });
    }
  };

module.exports = authenticateTeacher;

