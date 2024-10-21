import { Expense, Settlement } from "../type";

export const calculateSettlements = (
  expenses: Expense[],
  groupMembers: string[]
): Settlement[] => {
  const balance: Record<string, number> = {};
  groupMembers.forEach((member) => {
    balance[member] = 0;
  });

  // Distribute expenses to members
  for (const expense of expenses) {
    const amountPerPerson = Math.floor(expense.amount / groupMembers.length);
    const remainder = expense.amount - amountPerPerson * groupMembers.length;
    for (const member of groupMembers) {
      balance[member] -= amountPerPerson;
    }
    // The rest is paid by the payer
    balance[expense.payer] -= remainder;
    balance[expense.payer] += expense.amount;
  }

  const settlements: Settlement[] = [];

  const debtors = Object.entries(balance).filter(([_, amount]) => amount < 0);
  const creditors = Object.entries(balance).filter(([_, amount]) => amount > 0);

  // Create a settlement list from the distributed expenses
  for (let [debtor, debtorAmount] of debtors) {
    while (debtorAmount < 0) {
      for (let i = 0; i < creditors.length; i++) {
        if (creditors[i][1] > 0) {
          const paymentAmount = Math.min(creditors[i][1], -debtorAmount);
          settlements.push({
            from: debtor,
            to: creditors[i][0],
            amount: paymentAmount,
          });
          debtorAmount += paymentAmount;
          creditors[i][1] -= paymentAmount;
          if (debtorAmount === 0) break;
        }
      }
    }
  }

  return settlements;
};
