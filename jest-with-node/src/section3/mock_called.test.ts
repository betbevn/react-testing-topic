test("toHaveBeenCalled", () => {
  const mockFunc = jest.fn();
  mockFunc();
  expect(mockFunc).toHaveBeenCalled();
});

test("toHaveBeenCalledTimes", () => {
  const mockFunc = jest.fn();
  mockFunc();
  mockFunc();
  expect(mockFunc).toHaveBeenCalledTimes(2);
});

test("toHaveBeenCalledWith", () => {
  const mockFunc = jest.fn();
  mockFunc("Hoge");
  expect(mockFunc).toHaveBeenCalledWith("Hoge");
});
