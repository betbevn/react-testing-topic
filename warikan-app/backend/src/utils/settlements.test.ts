import { Expense, Settlement } from "../type";
import { calculateSettlements } from "./settlements";

describe("calculateSettlements", () => {
  test("", () => {
    const expenses: Expense[] = [
      {
        groupName: "group1",
        expenseName: "expense1",
        payer: "member1",
        amount: 300,
      },
      {
        groupName: "group2",
        expenseName: "expense2",
        payer: "member2",
        amount: 100,
      },
    ];

    const groupMembers = ["member1", "member2", "member3"];

    const expectedSettlements: Settlement[] = [
      { from: "member2", to: "member1", amount: 34 },
      { from: "member3", to: "member1", amount: 133 },
    ];

    const result = calculateSettlements(expenses, groupMembers);

    expect(result).toEqual(expectedSettlements);
  });
});
