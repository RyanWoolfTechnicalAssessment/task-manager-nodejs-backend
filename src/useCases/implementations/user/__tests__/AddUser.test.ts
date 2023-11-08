import { IUserRepository } from "../../../../repository/interface/IUserRepository";
import { UserRepositoryMockImpl } from "../../../../repository/implementation/UserRepositoryMockImpl";
import { IAddUserRequest } from "../../../interfaces/user/requestObjects/IAddUserRequest";
import { IAddUser } from "../../../interfaces/user/IAddUser";
import { AddUserImpl } from "../AddUserImpl";
import { CustomError } from "../../../../errorHandling/CustomError";

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
        // Check if the error is an instance of CustomError
        expect(error).toBeInstanceOf(CustomError);
      }
      // Todo could not get this to work, Matcher error: received value must be a mock or spy function
      // expect(existingUserRoleStatus.createUserRoleStatus()).not.toHaveBeenCalled();
    });
  });
});
