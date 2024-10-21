import fs from "fs";
import { GroupRepository } from "./groupRepository";
import { Group } from "../type";

jest.mock("fs");

describe("GroupRepository", () => {
  const mockFs = jest.mocked(fs);
  let repo: GroupRepository;

  beforeEach(() => {
    mockFs.existsSync.mockClear();
    mockFs.readFileSync.mockClear();
    mockFs.writeFileSync.mockClear();

    repo = new GroupRepository("groups.json");
  });

  describe("loadGroups", () => {
    test("can load data", () => {
      const groups: Group[] = [
        {
          name: "group1",
          members: ["member1", "member2"],
        },
        {
          name: "group2",
          members: ["member1", "member2"],
        },
      ];

      const mockData = JSON.stringify(groups);

      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readFileSync.mockReturnValueOnce(mockData);
      const result = repo.loadGroups();
      expect(result).toEqual(groups);
    });

    test("data empty", () => {
      mockFs.existsSync.mockReturnValueOnce(false);
      const result = repo.loadGroups();
      expect(result).toEqual([]);
    });
  });

  describe("saveGroup", () => {
    test("able to save group", () => {
      const group: Group = {
        name: "group1",
        members: ["member1", "member2"],
      };

      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify([]));
      repo.saveGroup(group);
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "groups.json",
        JSON.stringify([group])
      );
    });
  });
});
