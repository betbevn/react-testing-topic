import { render, screen } from "@testing-library/react";
import App from "./App";

test("Test example", () => {
  render(<App />);
  expect(1 + 1).toBe(2);
  expect(
    screen.getByText("Click on the Vite and React logos to learn more")
  ).toBeInTheDocument();
});
