import { divide, ZeroDivisorError } from "./divide";

// beforeAll(() => console.log("1 - beforeAll"));
// beforeEach(() => console.log("1 - beforeEach"));

test("Can not divide to 0", () => {
  expect(() => divide(10, 0)).toThrow();
  expect(() => divide(10, 0)).toThrow("Can not divide to 0");
  expect(() => divide(10, 0)).toThrow(ZeroDivisorError);
});

test("1 + 1 = 2", () => {
  expect(1 + 1).toBe(2);
});

// afterEach(() => console.log("1 - afterEach"));
// afterAll(() => console.log("1 - afterAll"));
