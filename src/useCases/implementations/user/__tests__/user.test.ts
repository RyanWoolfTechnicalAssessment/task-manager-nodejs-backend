import { IUserRepository } from "../../../../repository/interface/IUserRepository";
import { UserRepositoryMockImpl } from "../../../../repository/implementation/UserRepositoryMockImpl";
import { IAddUserRoleStatus } from "../../../interfaces/user/IAddUserRoleStatus";
import { AddUserRoleStatusImpl } from "../AddUserRoleStatusImpl";
import { AddRoleImpl } from "../AddRoleImpl";
import { IAddRole } from "../../../interfaces/user/IAddRole";
import { IAddUserRequest } from "../../../interfaces/user/requestObjects/IAddUserRequest";
import { AddUserImpl } from "../AddUserImpl";
import { IAddUser } from "../../../interfaces/user/IAddUser";
import { ErrorResponseHandler } from "../../../../errorHandling/errorResponseHandler";

describe("add user role status", () => {
  describe("given the user role status does not exist it should return new user role status", () => {
    it("should return an added item", async () => {
      const userRepository: IUserRepository = new UserRepositoryMockImpl();
      const doesNotExistUserrolestatus: {
        version: number;
        statusName: string;
        statusCode: string;
      } = {
        version: 1,
        statusCode: "doesNotExist",
        statusName: "Does Not Exist",
      };

      const doesNotExistUserRoleStatus: IAddUserRoleStatus =
        new AddUserRoleStatusImpl(doesNotExistUserrolestatus, userRepository);
      await doesNotExistUserRoleStatus.init();

      expect(doesNotExistUserRoleStatus.userRoleStatus.statusName).toBe(
        "Test Added Status Name",
      );
      // Todo could not get this to work, Matcher error: received value must be a mock or spy function
      // expect(doesNotExistUserRoleStatus.createUserRoleStatus()).toHaveBeenCalled();
    });
  });

  describe("given the user role status does exist, it should return the current user role status", () => {
    it("should return an the existing item", async () => {
      const userRepository: IUserRepository = new UserRepositoryMockImpl();
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

describe("add user", () => {
  describe("given the user does not exist, it should return new user", () => {
    it("should return an added user", async () => {
      const userRepository: IUserRepository = new UserRepositoryMockImpl();
      const doesNotExistUser: IAddUserRequest = {
        userName: "newUser",
        password: "mytestpassword123",
        enabled: true,
        lastLogin: new Date(),
      };

      const doesNotExistUserRequest: IAddUser = new AddUserImpl(
        doesNotExistUser,
        userRepository,
      );
      await doesNotExistUserRequest.init();

      // @ts-ignore
      expect(doesNotExistUserRequest.user.id).toBe(1);

      // Todo could not get this to work, Matcher error: received value must be a mock or spy function
      // expect(doesNotExistRoleRequest.createRole()).toHaveBeenCalled();
    });
  });

  describe("given the user exists, it should return the current user", () => {
    it("should return an the existing item", async () => {
      const userRepository: IUserRepository = new UserRepositoryMockImpl();
      const existingUserRequest: IAddUserRequest = {
        userName: "exists",
        password: "sdjkhuieheushkjsdf",
        enabled: true,
        lastLogin: new Date(),
      };

      const existingUser: IAddUser = new AddUserImpl(
        existingUserRequest,
        userRepository,
      );

      try {
        await existingUser.init();
        // If init() doesn't throw an error, fail the test
        fail("Expected an error to be thrown.");
      } catch (error) {
        // Check if the error is an instance of ErrorResponseHandler
        expect(error).toBeInstanceOf(ErrorResponseHandler);
      }
      // Todo could not get this to work, Matcher error: received value must be a mock or spy function
      // expect(existingUserRoleStatus.createUserRoleStatus()).not.toHaveBeenCalled();
    });
  });
});
