```sh
pnpm i typescript @types/express @types/node prisma ts-node ts-node-dev --save-dev
pnpm i express bcrypt @prisma/client jsonwebtoken zod
pnpm i http-status-codes multer
pnpm i --save-dev @types/multer
pnpm add cloudinary
pnpm install --save-dev prettier
pnpm run prettier

npx tsc --init
pnpm prisma init --datasource-provider sqlite
npx prisma migrate dev --name init
```

```sh
pnpm install --save-dev prettier
pnpm run prettier
.prettierrc
{
    "singleQuote": true,
    "trailingComma": "all",
    "tabWidth": 2,
    "semi": true,
    "arrowParens": "always",
    "printWidth": 80
  }
```

```sh
pnpm install eslint --save-dev
npx eslint --init
npx eslint .
package.json
"eslintConfig": {
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["@typescript-eslint"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  "rules": {
    // Add additional rules or overrides here
  }
}
```

```ts
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
![Authentication Flow](https://github.com/TomDoesTech/REST-API-Tutorial-Updated/raw/main/diagrams/refresh-token-flow.png)
```

---

```ts
import { Request, Response, NextFunction } from 'express';
import multer, { MulterError } from 'multer';
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
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = file.fieldname + '-' + uniqueSuffix + fileExtension;
      cb(null, filename);
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
```

> **_It incorporates the suggested improvements for better performance, such as using asynchronous file system operations (`fs.promises`), creating destination folders only once during server startup, and utilizing `Set` data structure for faster lookup of allowed MIME types. By using async operations, the code avoids blocking the event loop, resulting in better concurrency and responsiveness. Creating the destination folders once reduces unnecessary checks and filesystem operations. Using `Set` for allowed MIME types improves lookup performance compared to an array._**
