import { Meta, StoryObj } from "@storybook/react";
import Counter from "./Counter";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta = {
  title: "Counter",
  component: Counter,
} as Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof Counter>;

export const InitialValue: Story = {
  args: {
    initialCount: 2,
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Count: 2")).toBeInTheDocument();
  },
};
