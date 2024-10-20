test("mockReturnValue", () => {
  const mockFunc = jest.fn();
  mockFunc.mockReturnValue("Mock return value");
  expect(mockFunc()).toBe("Mock return value");
  expect(mockFunc()).toBe("Mock return value");
  expect(mockFunc()).toBe("Mock return value");
});

test("mockReturnValueOnce", () => {
  const mockFunc = jest.fn();
  mockFunc.mockReturnValueOnce("Mock return value");
  expect(mockFunc()).toBe("Mock return value");
  expect(mockFunc()).toBe(undefined);
});

test("mockResolvedValue", async () => {
  const mockFunc = jest.fn();
  mockFunc.mockResolvedValue("Resolved value");
  const result = await mockFunc();
  expect(result).toBe("Resolved value");
});
