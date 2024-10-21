import { Meta, StoryObj } from "@storybook/react";
import SettlementList from "./SettlementList";
import { Settlement } from "../../type";

const meta = {
  title: "SettlementList",
  component: SettlementList,
} as Meta<typeof SettlementList>;

export default meta;

type Story = StoryObj<typeof SettlementList>;

const settlements: Settlement[] = [
  { from: "member2", to: "member1", amount: 1000 },
  { from: "member", to: "member1", amount: 1000 },
];

export const Default: Story = {
  args: {
    settlements,
  },
};
