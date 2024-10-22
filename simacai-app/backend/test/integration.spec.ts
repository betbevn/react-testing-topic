import request from "supertest";
import fs from "fs";
import { createApp } from "../src/app";
import { Expense, Group } from "../src/type";

const GROUP_FILE_PATH = "../data/integration/groups.json";
const EXPENSE_FILE_PATH = "../data/integration/expenses.json";

const testGroups: Group[] = [
  {
    name: "group1",
    members: ["member1", "member2", "member3"],
  },
  {
    name: "group2",
    members: ["m1", "m2", "m3"],
  },
];

const testExpenses: Expense[] = [
  {
    groupName: "group1",
    expenseName: "name1",
    payer: "member1",
    amount: 1000,
  },
];

describe("Integration test", () => {
  let app: any;

  beforeEach(() => {
    fs.writeFileSync(GROUP_FILE_PATH, JSON.stringify(testGroups));
    fs.writeFileSync(EXPENSE_FILE_PATH, JSON.stringify(testExpenses));

    app = createApp(GROUP_FILE_PATH, EXPENSE_FILE_PATH);
  });

  describe("GET /groups", () => {
    test("fetch data", async () => {
      const response = await request(app).get("/groups");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(testGroups);
    });
  });

  describe("POST /groups", () => {
    test("add data", async () => {
      const group: Group = { name: "group3", members: ["Ken", "Bob"] };

      const response = await request(app).post("/groups").send(group);

      expect(response.status).toBe(200);
      expect(response.text).toBe("Group creation successful");
    });
  });
});
