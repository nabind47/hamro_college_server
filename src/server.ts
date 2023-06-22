import express, { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import { unlinkSync } from 'fs';
import upload from './middlewares/upload.middleware';

const app = express();

// Configure Cloudinary credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'djq7boegg',
  api_key: process.env.CLOUDINARY_API_KEY || '834811133725895',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'J04uJ4CU3h86ZbBENHi1yiSzLwg',
});

app.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { secure_url } = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'notices', // Optional: Specify a folder in Cloudinary to store the uploaded images
      resource_type: 'auto', // Optional: Detect the resource type automatically (image, video, raw)
    });

    res.json({ url: secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  } finally {
    if (req.file) {
      unlinkSync(req.file.path); // Remove the temporary file
    }
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
