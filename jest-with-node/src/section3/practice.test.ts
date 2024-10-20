import axios from "axios";
import Users from "./practice ";

jest.mock("axios");
const mockAxios = jest.mocked(axios);

describe("", () => {
  beforeEach(() => {
    mockAxios.get.mockClear();
  });

  test("should fetch users", async () => {
    const users = [{ name: "Bob" }];
    const resp = { data: users };
    mockAxios.get.mockResolvedValue(resp);

    const result = await Users.all();
    expect(result).toEqual(users);
    expect(mockAxios.get).toHaveBeenCalledWith("/users.json");
  });
});
