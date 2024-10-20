/**
 * [Practice]
 * Create a test for the Users class below.
 *
 * [Hint]
 * 1. Mock axios using jest.mock.
 * 2. Use mockResolvedValue or mockImplementation to set the mocked axios.get to return the expected result.
 */
import axios from "axios";

class Users {
  static async all() {
    const resp = await axios.get("/users.json");
    return resp.data;
  }
}

export default Users;
