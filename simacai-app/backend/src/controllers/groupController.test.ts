import express from "express";
import { GroupService } from "../services/groupService";
import { GroupController } from "./groupController";
import { Group } from "../type";

describe("GroupController", () => {
  let mockGroupService: Partial<GroupService>;
  let req: Partial<express.Request>;
  let res: Partial<express.Response>;
  let next: jest.Mock;
  let groupController: GroupController;

  beforeEach(() => {
    mockGroupService = {
      getGroups: jest.fn(),
      getGroupByName: jest.fn(),
      addGroup: jest.fn(),
    };

    groupController = new GroupController(mockGroupService as GroupService);

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  describe("addGroup", () => {
    test("able to add", () => {
      const group: Group = { name: "group1", members: ["member1", "member2"] };

      req.body = group;

      (mockGroupService.getGroups as jest.Mock).mockReturnValueOnce([]);

      groupController.addGroup(
        req as express.Request,
        res as express.Response,
        next as express.NextFunction
      );

      expect(mockGroupService.addGroup).toHaveBeenCalledWith(group);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("invalid group: not valid name", () => {
      const invalidGroup: Group = { name: "", members: ["member1", "member2"] };

      req.body = invalidGroup;

      groupController.addGroup(
        req as express.Request,
        res as express.Response,
        next as express.NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(["Group name is required"]);
    });

    test("invalid group: duplicate member name", () => {
      const invalidGroup: Group = {
        name: "group1",
        members: ["member1", "member1"],
      };

      req.body = invalidGroup;

      groupController.addGroup(
        req as express.Request,
        res as express.Response,
        next as express.NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(["Duplicate member name"]);
    });
  });
});
