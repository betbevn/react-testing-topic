import { z } from "zod";

export const expenseSchema = z
  .object({
    expenseName: z.string().min(1, "Expense name is required"),
    payer: z.string().min(1, "Paying members are required"),
    amount: z.preprocess(
      (v) => Number(v),
      z.number().int().min(1, "The amount must be an integer of 1 yen or more.")
    ),
  })
  .strict();

export type ExpenseSchema = z.infer<typeof expenseSchema>;
