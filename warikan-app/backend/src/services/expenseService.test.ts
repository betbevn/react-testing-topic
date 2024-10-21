import { ExpenseRepository } from "../repositories/expenseRepository";
import { Expense, Group } from "../type";
import { ExpenseService } from "./expenseService";
import { GroupService } from "./groupService";

describe("ExpenseService", () => {
  let mockGroupService: Partial<GroupService>;
  let mockExpenseRepository: Partial<ExpenseRepository>;
  let expenseService: ExpenseService;

  const group: Group = { name: "group1", members: ["member1", "member2"] };

  const expense: Expense = {
    groupName: "group1",
    expenseName: "expense",
    amount: 2000,
    payer: "member1",
  };

  beforeEach(() => {
    mockGroupService = {
      getGroupByName: jest.fn(),
    };
    mockExpenseRepository = {
      loadExpenses: jest.fn(),
      saveExpense: jest.fn(),
    };

    expenseService = new ExpenseService(
      mockExpenseRepository as ExpenseRepository,
      mockGroupService as GroupService
    );
  });

  describe("addExpense", () => {
    test("can add expense", () => {
      (mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce(group);
      expenseService.addExpense(expense);
      expect(mockExpenseRepository.saveExpense).toHaveBeenCalledWith(expense);
    });

    test("group not found", () => {
      (mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce(null);
      expect(() => {
        expenseService.addExpense(expense);
      }).toThrowError();
    });

    test("non member expense", () => {
      (mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce(group);
      const nonMemberExpense: Expense = { ...expense, payer: "member3" };

      expect(() => {
        expenseService.addExpense(nonMemberExpense);
      }).toThrowError();
    });
  });
});
