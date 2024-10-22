import express from "express";
import fs from "fs";

const GROUP_FILE_PATH = `${process.env.DATA_PATH}/groups.json`;
const EXPENSE_FILE_PATH = `${process.env.DATA_PATH}//expenses.json`;

export class TestController {
  init = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // Initializing test data
    fs.writeFileSync(GROUP_FILE_PATH, JSON.stringify([]));
    fs.writeFileSync(EXPENSE_FILE_PATH, JSON.stringify([]));

    return res.status(200).send("I have initialized the test file");
  };
}
