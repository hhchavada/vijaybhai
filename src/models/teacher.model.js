const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, 'First Name should contain only alphabets'],
  },
  lastName: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, 'Last Name should contain only alphabets'],
  },
  subject: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/@(gmail|outlook)\.com$/, 'Email should be @gmail.com or @outlook.com'],
  },
  password: {
    type: String,
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }]
});

teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    const rawPassword = this.password;
    if (rawPassword.length < 8 || rawPassword.length > 32) {
      throw new Error('Password must be between 8 and 32 characters long');
    }
    if (!/[a-z]/.test(rawPassword) || !/[A-Z]/.test(rawPassword) || !/\d/.test(rawPassword) || !/[@$!%*?&#]/.test(rawPassword)) {
      throw new Error('Password must contain lowercase, uppercase, number, and special character');
    }
  
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

module.exports = mongoose.model('Teacher', teacherSchema);
