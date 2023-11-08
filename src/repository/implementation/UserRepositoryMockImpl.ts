import { UserrolestatusAttributes } from "../../models/userrolestatus";
import { IUserRepository } from "../interface/IUserRepository";
import { CustomError } from "../../errorHandling/CustomError";
import { IAddUserRoleStatusRequest } from "../../useCases/interfaces/user/requestObjects/IAddUserRoleStatusRequest";
import { RoleAttributes } from "../../models/role";
import { IAddRoleRequest } from "../../useCases/interfaces/user/requestObjects/IAddRoleRequest";
import { UserAttributes } from "../../models/user";
import { IAddUserRequest } from "../../useCases/interfaces/user/requestObjects/IAddUserRequest";
import { Error } from "sequelize";
import {
  UserroleAttributes,
  UserroleInputAttributes,
} from "../../models/userrole";
import { IAddUserRoleRequest } from "../../useCases/interfaces/user/requestObjects/IAddUserRoleRequest";

export class UserRepositoryMockImpl implements IUserRepository {
  async findRolesByAuthorityList(
    authorityList: string[],
  ): Promise<RoleAttributes[] | null> {
    try {
      return null; // Todo implement mock and test
    } catch (err: any) {
      throw new CustomError(
        "An error occurred while getting list of roles",
        "DB-ROL-03",
        err.message,
        false,
      );
    }
  }

  async createUser(
    user: IAddUserRequest | null,
  ): Promise<UserAttributes | null> {
    if (user) {
      if (user.userName == "newUser") {
        return {
          id: 1,
          userName: user?.userName,
          password: user?.password,
          enabled: true,
          lastLogin: new Date(),
        };
      } else {
        return {
          id: 2,
          userName: user?.userName,
          password: user?.password,
          enabled: true,
          lastLogin: new Date(),
        };
      }
    } else {
      return null;
    }
  }

  async findUserByUserName(userName: string): Promise<UserAttributes | null> {
    try {
      if (userName == "newUser") {
        return null;
      } else {
        return {
          id: 2,
          userName: userName,
          password: "testpassword123",
          enabled: true,
          lastLogin: new Date(),
        };
      }
    } catch (err: any) {
      throw new CustomError(
        "An error occurred while finding user by username",
        "DB-USER-01",
        err.message,
        false,
      );
    }
  }

  async findUserRoleStatusByStatusCode(
    statusCode: string,
  ): Promise<UserrolestatusAttributes | null> {
    try {
      if (statusCode == "doesNotExist") {
        return null;
      } else {
        return {
          id: 1,
          statusCode: "Test Existing Status Code",
          statusName: "Test Existing Status Name",
        };
      }
    } catch (err: any) {
      throw new CustomError(
        "An error occurred while finding active user role status",
        "DB-URS-01",
        err.message,
        false,
      );
    }
  }

  async createUserRoleStatus(
    userRoleStatus: IAddUserRoleStatusRequest | undefined,
  ): Promise<UserrolestatusAttributes | null> {
    try {
      const userRoleStatusResponse = {
        id: 1,
        statusCode: "Test Added Status Code",
        statusName: "Test Added Status Name",
      };
      return userRoleStatusResponse;
    } catch (err: any) {
      throw new CustomError(
        "An error occurred while user role status",
        "DB-URS-02",
        err.message,
        false,
      );
    }
  }

  async findRoleByAuthority(authority: string): Promise<RoleAttributes | null> {
    if (authority == "doesNotExist") {
      return null;
    } else {
      const roleResponse = {
        id: 1,
        authority: "Test Existing Role Authority",
        displayName: "Test Existing Role Name",
      };
      return roleResponse;
    }
  }

  async createRole(
    role: IAddRoleRequest | undefined,
  ): Promise<RoleAttributes | null> {
    try {
      return {
        id: 1,
        authority: "Test Added Role Authority",
        displayName: "Test Added Role Name",
      };
    } catch (err: any) {
      throw new CustomError(
        "An error occurred while user role status",
        "DB-URS-02",
        err.message,
        false,
      );
    }
  }

  async createUserRole(
    userroleInputAttributes: UserroleInputAttributes,
  ): Promise<UserroleAttributes | null> {
    return {
      id: 1,
      userId: 1,
      roleId: 1,
      statusId: 1,
    };
  }

  async findUserRoleByAllAttributes(
    userroleInputAttributes: UserroleInputAttributes,
  ): Promise<UserroleAttributes | null> {
    if (userroleInputAttributes.userId == 1) {
      return {
        id: 1,
        userId: 1,
        roleId: 1,
        statusId: 1,
      };
    } else {
      return null;
    }
  }
}
