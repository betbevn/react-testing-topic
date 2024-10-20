import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("", () => {
  test("button can click", () => {
    render(<Button label="Click me!" onClick={() => alert("click")} />);

    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();
  });
});
