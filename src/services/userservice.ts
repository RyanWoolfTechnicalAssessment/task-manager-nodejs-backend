import { createSecretKey } from "crypto";
import db from "../models/sqlconfig";
import { Model, Op } from "sequelize";
import * as crypto from "crypto";
import {
  RegisterUserRequest,
  RegisterUserResponse,
  User,
} from "../definitions/user/userdefinitions";
import { IAddUser } from "../useCases/interfaces/user/IAddUser";
import { AddUserImpl } from "../useCases/implementations/user/AddUserImpl";
import { IAddUserRequest } from "../useCases/interfaces/user/requestObjects/IAddUserRequest";
import { IUserRepository } from "../repository/interface/IUserRepository";
import { UserRepositorySequalizeImpl } from "../repository/implementation/UserRepositorySequalizeImpl";
import { AddUserRoleImpl } from "../useCases/implementations/user/AddUserRoleImpl";
import { IAddUserRole } from "../useCases/interfaces/user/IAddUserRole";
import { IAddUserRoleRequest } from "../useCases/interfaces/user/requestObjects/IAddUserRoleRequest";
const log4js = require("log4js");

let logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

export async function registerUser(
  registerUserRequest: RegisterUserRequest,
  assignRoleList: Array<string>,
): Promise<RegisterUserResponse> {
  logger.debug(`assignRoleList:${assignRoleList}`);
  const userRepository: IUserRepository = new UserRepositorySequalizeImpl();
  logger.debug(`in register user`);

  const userObject: IAddUserRequest = {
    userName: registerUserRequest.userName,
    password: registerUserRequest.password,
    enabled: true,
    lastLogin: new Date(),
  };
  const addUser: IAddUser = new AddUserImpl(userObject, userRepository);
  await addUser.init();

  logger.debug(`addUser.user:${addUser.user}`);
  if (addUser.user) {
    for (const roleAuthority of assignRoleList) {
      logger.debug(`roleAuthority:${roleAuthority}`);

      const userRoleRequest: IAddUserRoleRequest = {
        userName: addUser.user.userName,
        authority: roleAuthority,
      };

      const addUserRole: IAddUserRole = new AddUserRoleImpl(
        userRoleRequest,
        userRepository,
      );
      await addUserRole.init();
    }
  }

  return {
    success: true,
    error: null,
    errorCode: null,
    errorList: null,
    data: addUser.user,
  };
}