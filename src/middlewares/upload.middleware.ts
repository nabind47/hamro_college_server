import { Request, Response, NextFunction } from 'express';
import multer, { MulterError } from 'multer';
import path from 'path';
import fs from 'fs';

// Set up multer storage for files
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationFolder = 'public/files';
    createFolderIfNotExists(destinationFolder);
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + fileExtension;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

// Set up multer storage for images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationFolder = 'public/images';
    createFolderIfNotExists(destinationFolder);
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + fileExtension;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

// File size limit in bytes (e.g., 5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed mime types for files
const FILE_ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
  'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
  'application/vnd.ms-powerpoint.template.macroEnabled.12',
  'application/vnd.ms-powerpoint.addin.macroEnabled.12',
  'application/vnd.ms-powerpoint.slide.macroEnabled.12',
  'application/vnd.ms-powerpoint.show.macroEnabled.12',
];

// Allowed mime types for images
const IMAGE_ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// Create multer instances for files and images
const fileUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (FILE_ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Invalid file type. Only documents, PDFs, Excel, and Power BI files are allowed.',
        ),
      );
    }
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (IMAGE_ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid image type. Only JPEG, PNG, and GIF images are allowed.'));
    }
  },
});

// Create destination folder if it doesn't exist
const createFolderIfNotExists = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Middleware function for uploading a single file
export const uploadFileMiddleware = (req: Request, res: Response, next: NextFunction) => {
  fileUpload.single('file')(req, res, (err: any) => {
    if (err) {
      if (err instanceof MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File size is too large' });
        }
      }
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

// Middleware function for uploading a single image
export const uploadImageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  imageUpload.single('image')(req, res, (err: any) => {
    if (err) {
      if (err instanceof MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File size is too large' });
        }
      }
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};
