import { render } from "@testing-library/react";
import { Settlement } from "../../type";
import SettlementList from "./SettlementList";

describe("SettlementList", () => {
  test("", () => {
    const settlements: Settlement[] = [
      { from: "member2", to: "member1", amount: 1000 },
    ];

    const { container } = render(<SettlementList settlements={settlements} />);

    expect(container).toMatchSnapshot();
  });
});
