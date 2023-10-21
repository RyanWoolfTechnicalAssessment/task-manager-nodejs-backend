import { UserrolestatusAttributes } from "../../models/userrolestatus";
import { IUserRepository } from "../interface/IUserRepository";
import db from "../../models/sqlconfig";
import { ErrorResponseHandler } from "../../errorHandling/errorResponseHandler";
import { IAddUserRoleStatusRequest } from "../../useCases/interfaces/user/requestObjects/IAddUserRoleStatusRequest";
import { RoleAttributes } from "../../models/role";
import { IAddRoleRequest } from "../../useCases/interfaces/user/requestObjects/IAddRoleRequest";
import { UserAttributes } from "../../models/user";
import { IAddUserRequest } from "../../useCases/interfaces/user/requestObjects/IAddUserRequest";
import { Op } from "sequelize";
import {
  UserroleAttributes,
  UserroleInputAttributes,
} from "../../models/userrole";
import { IAddUserRoleRequest } from "../../useCases/interfaces/user/requestObjects/IAddUserRoleRequest";

export class UserRepositorySequalizeImpl implements IUserRepository {
  async findRolesByAuthorityList(
    authorityList: string[],
  ): Promise<RoleAttributes[] | null> {
    try {
      const roleList = await db.role.findAll({
        where: {
          authority: { [Op.in]: authorityList },
        },
      });

      return roleList;
    } catch (err: any) {
      throw new ErrorResponseHandler(
        "An error occurred while getting list of roles",
        "DB-ROL-03",
        err.message,
        false,
      );
    }
  }

  async findUserByUserName(userName: string): Promise<UserAttributes | null> {
    try {
      const user = await db.user.findOne({
        where: {
          userName: userName,
        },
      });

      return user;
    } catch (err: any) {
      throw new ErrorResponseHandler(
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
      const userRoleStatus = await db.userrolestatus.findOne({
        where: {
          statusCode: statusCode,
        },
      });

      return userRoleStatus;
    } catch (err: any) {
      throw new ErrorResponseHandler(
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
      const userRoleStatusResponse =
        await db.userrolestatus.create(userRoleStatus);
      return userRoleStatusResponse;
    } catch (err: any) {
      throw new ErrorResponseHandler(
        "An error occurred while user role status",
        "DB-URS-02",
        err.message,
        false,
      );
    }
  }

  async findRoleByAuthority(authority: string): Promise<RoleAttributes | null> {
    try {
      const role = await db.role.findOne({
        where: {
          authority: authority,
        },
      });

      return role;
    } catch (err: any) {
      throw new ErrorResponseHandler(
        "An error occurred while finding ",
        "DB-ROL-02",
        err.message,
        false,
      );
    }
  }

  async createRole(
    role: IAddRoleRequest | undefined,
  ): Promise<RoleAttributes | null> {
    try {
      const roleResponse = await db.role.create(role);
      return roleResponse;
    } catch (err: any) {
      throw new ErrorResponseHandler(
        "An error occurred while user role status",
        "DB-ROL-01",
        err.message,
        false,
      );
    }
  }

  async createUser(
    user: IAddUserRequest | null,
  ): Promise<UserAttributes | null> {
    try {
      const userResponse = await db.user.create(user);
      return userResponse;
    } catch (err: any) {
      throw new ErrorResponseHandler(
        "An error occurred while adding user",
        "DB-USER-02",
        err.message,
        false,
      );
    }
  }

  async createUserRole(
    userroleInputAttributes: UserroleInputAttributes,
  ): Promise<UserroleAttributes | null> {
    try {
      const userRole = await db.userrole.create(userroleInputAttributes);
      return userRole;
    } catch (err: any) {
      throw new ErrorResponseHandler(
        "An error occurred while adding user role",
        "DB-USRROLE-01",
        err.message,
        false,
      );
    }
  }
}
