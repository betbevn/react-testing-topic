import { Meta, StoryObj } from "@storybook/react";
import Counter from "./Counter";
import { userEvent, within } from "@storybook/testing-library";
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

export const Increment: Story = {
  args: {
    initialCount: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");

    const button = buttons[1];
    await userEvent.click(button);
    expect(canvas.getByText("Count: 1")).toBeInTheDocument();
  },
};

export const Decrement: Story = {
  args: {
    initialCount: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");

    const button = buttons[0];
    await userEvent.click(button);
    expect(canvas.getByText("Count: 0")).toBeInTheDocument();
  },
};
