import { createSecretKey } from "crypto";
import db from "../models/sqlconfig";
import { Model, Op } from "sequelize";
import * as crypto from "crypto";
import {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  RegisterUserResponse,
  User,
  VerifyTokenResponse,
} from "../interfaces/user/user";
import { IAddUser } from "../useCases/interfaces/user/IAddUser";
import { AddUserImpl } from "../useCases/implementations/user/AddUserImpl";
import { IAddUserRequest } from "../useCases/interfaces/user/requestObjects/IAddUserRequest";
import { IUserRepository } from "../repository/interface/IUserRepository";
import { UserRepositorySequalizeImpl } from "../repository/implementation/UserRepositorySequalizeImpl";
import { AddUserRoleImpl } from "../useCases/implementations/user/AddUserRoleImpl";
import { IAddUserRole } from "../useCases/interfaces/user/IAddUserRole";
import { IAddUserRoleRequest } from "../useCases/interfaces/user/requestObjects/IAddUserRoleRequest";
import { UserRole } from "../enums/enums";
const log4js = require("log4js");
import * as jose from "jose";
import { JWTVerifyResult } from "jose";
import { UserAttributes } from "../models/user";
import { ILoginUser } from "../useCases/interfaces/user/ILoginUser";
import { LoginUserImpl } from "../useCases/implementations/user/LoginUserImpl";
import { TaskInputAttributes } from "../models/task";

let logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

export async function addTask(
  task: TaskInputAttributes,
): Promise<VerifyTokenResponse> {
  return verifyTokenResponse;
}
