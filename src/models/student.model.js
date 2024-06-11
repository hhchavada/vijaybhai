const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        const today = new Date();
        const age = today.getFullYear() - v.getFullYear();
        return age > 18;
      },
      message: 'Student must be more than 18 years old',
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/@(gmail|outlook)\.com$/, 'Email should be @gmail.com or @outlook.com'],
  },
  contactNo: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Contact number must be 10 digits'],
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
});

module.exports = mongoose.model('Student', studentSchema);
