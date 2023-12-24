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

let logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;
let testValue: number = 0;
export async function testSingletonBehaviour(
  initialValue: number,
): Promise<number> {
  testValue = initialValue;
  await new Promise((resolve) => setTimeout(resolve, initialValue * 2000));

  logger.debug(`initial value: ${initialValue} testValue:${testValue}`);

  return testValue;
}

export async function registerUser(
  registerUserRequest: RegisterUserRequest,
  assignRoleList: Array<UserRole>,
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

      const roleString = UserRole[roleAuthority];

      const userRoleRequest: IAddUserRoleRequest = {
        userName: addUser.user.userName,
        authority: roleString,
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

export async function verifyToken(token: string): Promise<VerifyTokenResponse> {
  let verifyTokenResponse: VerifyTokenResponse;
  let jwtSecret: string;
  let secretKey: any;

  // @ts-ignore
  jwtSecret = process.env.JWT_SECRET;
  logger.debug(`jwtSecret:${jwtSecret}`);

  secretKey = createSecretKey(jwtSecret, "utf-8");

  await jose
    .jwtVerify(token, secretKey, {
      issuer: "backend_admin",
      audience: "TaskManager",
    })
    .then((payload: JWTVerifyResult) => {
      logger.debug(`payload:${JSON.stringify(payload)}`);
      logger.debug(
        `payload.payload.sub:${JSON.stringify(payload.payload.sub)}`,
      );
      logger.debug(
        `payload.payload.thirdPartySystemId:${JSON.stringify(
          payload.payload.thirdPartySystemId,
        )}`,
      );

      verifyTokenResponse = {
        success: true,
        error: null,
        data: {
          // @ts-ignore
          userName: payload.payload.sub,
          // @ts-ignore
          expiresIn: payload.payload.exp,
          // @ts-ignore
          thirdPartySystemId: payload.payload.thirdPartySystemId,
        },
      };
    })
    .catch((error: any) => {
      verifyTokenResponse = {
        success: false,
        error: error.message,
        data: null,
      };
    });

  // @ts-ignore
  return verifyTokenResponse;
}

export async function login(
  loginUserRequest: LoginUserRequest,
): Promise<LoginUserResponse> {
  logger.debug(`in login service`);
  let errorList: string[] = [];
  let loginUserResponse: LoginUserResponse;
  let errorCode: string | null;
  const userRepository: IUserRepository = new UserRepositorySequalizeImpl();
  const loginUSer: ILoginUser = new LoginUserImpl(
    loginUserRequest,
    userRepository,
  );
  await loginUSer.init();
  if (loginUSer.user) {
    loginUserResponse = {
      success: true,
      error: null,
      errorCode: null,
      errorList: null,
      data: {
        // @ts-ignore
        userName: loginUSer.user?.userName,
        // @ts-ignore
        access_token: loginUSer.accessToken,
        // @ts-ignore
        refresh_token: loginUSer.refreshToken,
        roleList: loginUSer.userRoleList,
      },
    };
  } else {
    loginUserResponse = {
      success: false,
      error: "There was an error logging you in",
      // @ts-ignore
      errorCode: errorCode,
      errorList: errorList,
      data: null,
    };
  }
  // @ts-ignore
  return loginUserResponse;
}
