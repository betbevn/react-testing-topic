import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta = {
  title: "Button",
  component: Button,
  argTypes: {
    label: {
      options: ["Primary button", "Normal button"],
      control: { type: "select" },
    },
  },
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Primary button",
    primary: true,
  },
};

export const Normal: Story = {
  args: {
    label: "Normal button",
    primary: false,
  },
};
