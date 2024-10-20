import { renderHook } from "@testing-library/react";
import { act } from "react";
import useCounter from "./useCounter";

describe("useCounter", () => {
  test("increment", () => {
    const { result } = renderHook(() => useCounter(1));
    expect(result.current.count).toBe(1);
    act(() => result.current.increment());
    expect(result.current.count).toBe(2);
  });
});
