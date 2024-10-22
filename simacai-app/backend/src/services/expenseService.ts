import { GroupService } from "./groupService";
import { calculateSettlements } from "../utils/settlements";
import { Expense, Settlement } from "../type";
import { ExpenseRepository } from "../repositories/expenseRepository";

export class ExpenseService {
  constructor(
    private expenseRepository: ExpenseRepository,
    private groupService: GroupService
  ) {}

  getSettlements = (groupName: string): Settlement[] => {
    const group = this.groupService.getGroupByName(groupName);
    if (!group) {
      throw new Error(`Group: ${groupName} does not exist`);
    }

    const expenses = this.expenseRepository
      .loadExpenses()
      .filter((expense) => expense.groupName === groupName);
    return calculateSettlements(expenses, group.members);
  };

  addExpense = (expense: Expense): void => {
    const group = this.groupService.getGroupByName(expense.groupName);
    if (!group) {
      throw new Error(`Group: ${expense.groupName} does not exist`);
    }

    if (!group.members.includes(expense.payer)) {
      throw new Error("The payer is not among the members");
    }

    this.expenseRepository.saveExpense(expense);
  };
}
