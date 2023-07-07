import express from 'express';
import cors from 'cors';
import path from 'path';

import authRoutes from './modules/auth/auth.routes';
import noticeRoutes from './modules/notice/notice.routes';
import { uploadFileMiddleware, uploadImageMiddleware } from './middlewares/upload.middleware';

const app = express();
app.use(express.json());

// Set up the static file middleware to serve the uploaded files
app.use('/public/files', express.static(path.join(__dirname, '..', 'public', 'files')));
app.use('/public/images', express.static(path.join(__dirname, '..', 'public', 'images')));

// Apply CORS middleware
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api', noticeRoutes);

// http://localhost:1337/public/images/image-1688344250817-327880280.png
app.post('/api/image', uploadImageMiddleware, (req, res) => {
  // Access the uploaded image using 'req.file'

  // Do something with the image, e.g., save it to a database, process it, etc.
  console.log(req.file);
  res.json({ message: 'File uploaded successfully!' });
});

// http://localhost:1337/public/files/file-1688344296566-872167895.pdf
app.post('/api/file', uploadFileMiddleware, (req, res) => {
  console.log('requesting file 1');
  // Access the uploaded image using 'req.file'
  // Do something with the image, e.g., save it to a database, process it, etc.
  console.log(req.file);
  res.json({ message: 'File uploaded successfully!' });
});

app.listen(1337, () => {
  console.log('Server is running on port 1337/');
});
