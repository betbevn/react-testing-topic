import { expect, test } from "@playwright/test";
import axios from "axios";

test.describe("Integration test", () => {
  test.beforeEach(async ({ page }) => {
    await axios.get("http://localhost:3000/init");
    await page.goto("http://localhost:3001");
  });

  test.describe("Flow", () => {
    test("submit form", async ({ page }) => {
      const groupNameInput = page.getByLabel("Group Name");
      await groupNameInput.fill("group1");
      const memberListInput = page.getByLabel("Members");
      await memberListInput.fill("m1, m2");

      const submitButton = page.getByRole("button");
      await submitButton.click();

      await expect(page).toHaveURL(/.+\/group\/group1/);
    });

    test("invalid data", async ({ page }) => {
      const submitButton = page.getByRole("button");
      await submitButton.click();

      await expect(page.getByText("Group name is required")).toBeVisible();
      await expect(page.getByText("メンバーは2人以上必要です")).toBeVisible();
      await expect(page).not.toHaveURL(/.+\/group\/group1/);
    });
  });

  test.describe("The company has a good reputation.", () => {
    test.beforeEach(async ({ page }) => {
      const groupNameInput = page.getByLabel("Group Name");
      await groupNameInput.fill("group1");
      const memberListInput = page.getByLabel("Members");
      await memberListInput.fill("m1, m2");

      const submitButton = page.getByRole("button");
      await submitButton.click();
    });

    test("Expenses are registered and the reimbursement list is updated.", async ({
      page,
    }) => {
      const expenseNameInput = page.getByLabel("Expense Name");
      await expenseNameInput.fill("lunch");
      const amountInput = page.getByLabel("Amount");
      await amountInput.fill("1000");
      const memberSelect = page.getByLabel("Paying Member");
      await memberSelect.selectOption("m1");

      const submitButton = page.getByRole("button");
      await submitButton.click();

      await expect(page).toHaveURL(/.+\/group\/group1/);
      await expect(page.getByRole("list")).toHaveText("m2 → m1500円");
    });

    test("If there is a validation error, the expenditure is not registered and the reimbursement list is not updated.", async ({
      page,
    }) => {
      const submitButton = page.getByRole("button");
      await submitButton.click();

      await expect(page.getByText("Expense name is required")).toBeVisible();
      await expect(
        page.getByText("The amount must be an integer of 1 yen or more.")
      ).toBeVisible();
      await expect(page.getByText("Paying members are required")).toBeVisible();

      await expect(page.getByRole("list")).toHaveText("");
    });
  });
});
