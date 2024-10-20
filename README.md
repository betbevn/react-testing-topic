# Setup jest

### Install dependencies

```bash
npm install --save-dev @types/jest jest ts-jest
```

### Init jest.config.js

Using npm:

```bash
npx ts-jest config:init
```

Using yarn:

```bash
yarn ts-jest config:init
```

### Init tsconfig.json (optional)

```bash
npm i -D typescript
npx tsc --init
```

# Setup react testing library

### Install dependencies

```bash
npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom @testing-library/jest-dom @testing-library/user-event
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
