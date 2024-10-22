import { z } from "zod";

export const expenseSchema = z
  .object({
    groupName: z.string().min(1, "Group name is required"),
    expenseName: z.string().min(1, "Expense name is required"),
    payer: z.string().min(1, "Paying members are required"),
    amount: z.coerce
      .number()
      .int()
      .min(1, "The amount must be an integer of 1 $ or more."),
  })
  .strict();

export type ExpenseSchema = z.infer<typeof expenseSchema>;
