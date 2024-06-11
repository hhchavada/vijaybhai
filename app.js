const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');

const teacherRoutes = require('./src/routes/teacher.route');
const studentRoutes = require('./src/routes/student.route');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
