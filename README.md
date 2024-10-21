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

# Setup storybook (v7)

### Install dependencies

```bash
npx sb@7 init
```

### Interaction testing using Storybook (With jest)

```bash
npm i -D @storybook/jest
```

### Example

```tsx
import { Meta, StoryObj } from "@storybook/react";
import Form from "./Form";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta = {
  title: "Form",
  component: Form,
} as Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof Form>;
export const Default: Story = {};
export const Testing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await expect(input).toHaveTextContent("");
    await userEvent.type(input, "play function");
    await expect(canvas.getByDisplayValue("play function")).toBeInTheDocument();
  },
};
```

# Integration test for backend

```bash
npm i -D supertest @types/supertest
```

# Mock Service Worker

```bash
npm i -D msw@1.3.2
```
