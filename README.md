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
```

![Authentication Flow](https://github.com/TomDoesTech/REST-API-Tutorial-Updated/raw/main/diagrams/refresh-token-flow.png)
