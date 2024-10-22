import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateGroupForm from "./CreateGroupForm";

const mockOnSubmit = jest.fn();
const user = userEvent.setup();

describe("CreateGroupForm", () => {
  beforeEach(() => {
    render(<CreateGroupForm onSubmit={mockOnSubmit} />);
  });

  test("submit form", async () => {
    await user.type(screen.getByLabelText("Group Name"), "group1");
    await user.type(screen.getByLabelText("Members"), "member1, member2");
    await user.click(screen.getByRole("button"));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "group1",
      members: ["member1", "member2"],
    });

    await waitFor(() => {
      expect(screen.queryByDisplayValue("group1")).toBeNull();
      expect(screen.queryByDisplayValue("member1, member2")).toBeNull();
    });
  });

  test("invlaid data when submit form", async () => {
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Group name is required")).toBeInTheDocument();
    expect(
      screen.getByText("Two or more members are required")
    ).toBeInTheDocument();
  });
});
