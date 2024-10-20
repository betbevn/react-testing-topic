import { sum } from "./sum";

test("test sum function", () => {
  const total = sum(1, 2);

  expect(total).toBe(3);
});

test.each`
  a    | b     | expected
  ${1} | ${2}  | ${3}
  ${1} | ${-2} | ${-1}
`("Paramererized Tests", ({ a, b, expected }) => {
  expect(sum(a, b)).toBe(expected);
});
