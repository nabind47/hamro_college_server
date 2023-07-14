import { Request, Response, NextFunction } from 'express';
import multer, { MulterError } from 'multer';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

import { FILE_MIME_TYPES, FILE_MAX_SIZE, IMAGE_MIME_TYPES } from '../constants';

const createFolderIfNotExists = async (folderPath: string) => {
  try {
    await fs.promises.mkdir(folderPath, { recursive: true });
  } catch (err) {
    throw new Error(`Error creating folder: ${folderPath}`);
  }
};

const createStorage = (destinationPath: string) =>
  multer.diskStorage({
    destination: async (req, file, cb) => {
      await createFolderIfNotExists(destinationPath);
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const uniqueId = crypto.randomBytes(8).toString('hex');
      const shortFilename = uniqueId.slice(0, 10) + fileExtension;
      cb(null, shortFilename);
    },
  });

const createUpload = (storage: multer.StorageEngine, allowedMimeTypes: Set<string>) =>
  multer({
    storage,
    limits: {
      fileSize: FILE_MAX_SIZE,
    },
    fileFilter: async (req, file, cb) => {
      const { mimetype } = file;

      if (allowedMimeTypes.has(mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type.'));
      }
    },
  }).single('file');

const fileStorage = createStorage(path.join('public', 'files'));
const fileUpload = createUpload(fileStorage, new Set(FILE_MIME_TYPES));

const imageStorage = createStorage(path.join('public', 'images'));
const imageUpload = createUpload(imageStorage, new Set(IMAGE_MIME_TYPES));

export const uploadFileMiddleware = (req: Request, res: Response, next: NextFunction) => {
  fileUpload(req, res, (err: any) => {
    if (err) {
      if (err instanceof MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size is too large' });
      }
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

export const uploadImageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  imageUpload(req, res, (err: any) => {
    if (err) {
      if (err instanceof MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size is too large' });
      }
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};
