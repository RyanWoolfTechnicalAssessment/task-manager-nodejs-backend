import { IUserRepository } from "../../../../repository/interface/IUserRepository";
import { UserRepositoryMockImpl } from "../../../../repository/implementation/UserRepositoryMockImpl";
import { IAddRole } from "../../../interfaces/user/IAddRole";
import { AddRoleImpl } from "../AddRoleImpl";
import { IAddUserRoleStatus } from "../../../interfaces/user/IAddUserRoleStatus";
import { AddUserRoleStatusImpl } from "../AddUserRoleStatusImpl";

describe("add role", () => {
  describe("given the role does not exist, it should return new user role status", () => {
    it("should return an added item", async () => {
      const userRepository: IUserRepository = new UserRepositoryMockImpl();
      const doesNotExistRole: { displayName: string; authority: string } = {
        displayName: "doesNotExist",
        authority: "doesNotExist",
      };

      const doesNotExistRoleRequest: IAddRole = new AddRoleImpl(
        doesNotExistRole,
        userRepository,
      );
      await doesNotExistRoleRequest.init();

      expect(doesNotExistRoleRequest.role.authority).toBe(
        "Test Added Role Authority",
      );

      // Todo could not get this to work, Matcher error: received value must be a mock or spy function
      // expect(doesNotExistRoleRequest.createRole()).toHaveBeenCalled();
    });
  });

  describe("given the role exists, it should return the current role", () => {
    it("should return an the existing item", async () => {
      const userRepository: IUserRepository = new UserRepositoryMockImpl();
      const createUserRoleStatus = jest.fn();
      const existingUserrolestatus: {
        version: number;
        statusName: string;
        statusCode: string;
      } = {
        version: 1,
        statusCode: "exists",
        statusName: "Does Exist",
      };

      const existingUserRoleStatus: IAddUserRoleStatus =
        new AddUserRoleStatusImpl(existingUserrolestatus, userRepository);
      await existingUserRoleStatus.init();

      expect(existingUserRoleStatus.userRoleStatus.statusName).toBe(
        "Test Existing Status Name",
      );

      // Todo could not get this to work, Matcher error: received value must be a mock or spy function
      // expect(existingUserRoleStatus.createUserRoleStatus()).not.toHaveBeenCalled();
    });
  });
});
