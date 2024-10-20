import { render, screen, waitFor } from "@testing-library/react";
import { UserSearch } from "./UserSearch";
import userEvent from "@testing-library/user-event";
import axios from "axios";

const user = userEvent.setup();
jest.mock("axios");
const mockAxios = jest.mocked(axios);

describe("User search component", () => {
  beforeEach(() => {
    mockAxios.get.mockClear();
  });

  test("can fetch data from api", async () => {
    const users = { id: "123", name: "Joseph" };
    const resp = { data: users };
    mockAxios.get.mockResolvedValue(resp);

    render(<UserSearch />);

    expect(screen.getByText("Search")).toBeInTheDocument();
    const input = screen.getByRole("textbox");
    await user.type(input, users.name);
    expect(screen.getByDisplayValue(users.name)).toBeInTheDocument();

    const button = screen.getByRole("button");
    await user.click(button);

    expect(mockAxios.get).toHaveBeenCalledWith(
      `/api/users?query=${users.name}`
    );

    await waitFor(() => {
      expect(screen.getByText(users.name)).toBeInTheDocument();
    });
  });
});
