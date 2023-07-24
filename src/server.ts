import express from 'express';
import cors from 'cors';
import path from 'path';

import { uploadFileMiddleware } from './middlewares/upload.middleware';

import authRoutes from './modules/auth/auth.routes';
import noticeRoutes from './modules/notice/notice.routes';
import studentsRoutes from './modules/students/student.routes';
import departmentRoutes from './modules/department/department.routes';
import semesterRoutes from './modules/semester/semester.routes';
import subjectRoutes from './modules/subject/subject.routes';

const app = express();

app.use(express.json());

// Set up the static file middleware to serve the uploaded files
app.use('/public/files', express.static(path.join(__dirname, '..', 'public', 'files')));
app.use('/public/images', express.static(path.join(__dirname, '..', 'public', 'images')));

// Apply CORS middleware
app.use(cors());

// Mount specific routes
app.use('/api/auth', authRoutes);
app.use('/api', noticeRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/subjects', subjectRoutes);

app.post('/api/file', uploadFileMiddleware, (req, res) => {
  // Access the uploaded image using 'req.file'
  // Do something with the image, e.g., save it to a database, process it, etc.
  console.log(req.file);
  res.json({ message: 'File uploaded successfully!' });
});

app.listen(1337, () => {
  console.log('Server is running on port 1337/');
});
