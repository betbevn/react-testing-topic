# Setup jest

### Install dependencies

```bash
npm install --save-dev @types/jest jest ts-jest
```

### Init jest.config.js

Technically, We do not need a jest.config.js file to run jest, but we need it to config with react-testing-library. So we leave it here

Using npm:

```bash
npx ts-jest config:init
```

Using yarn:

```bash
yarn ts-jest config:init
```

# Setup react testing library

### Install dependencies

```bash
npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom @testing-library/jest-dom
```

### Update jest.config.js file

```js
/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest", { tsconfig: "tsconfig.app.json" }],
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
```
