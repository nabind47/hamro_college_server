```sh
pnpm i typescript @types/express @types/node prisma ts-node ts-node-dev --save-dev
pnpm i express bcrypt @prisma/client jsonwebtoken zod
pnpm i http-status-codes
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

![Authentication Flow](https://github.com/TomDoesTech/REST-API-Tutorial-Updated/raw/main/diagrams/refresh-token-flow.png)
