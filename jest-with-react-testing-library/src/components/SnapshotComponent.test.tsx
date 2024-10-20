import { render } from "@testing-library/react";
import SnapshotComponent from "./SnapshotComponent";

test("SnapshotComponent", () => {
  const { container } = render(<SnapshotComponent text="Vue" />);
  expect(container).toMatchSnapshot();
});
