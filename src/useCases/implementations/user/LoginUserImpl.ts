import { UserAttributes } from "../../../models/user";
import {
  LoginUserRequest,
  LoginUserResponse,
  VerifyTokenResponse,
} from "../../../definitions/user/userdefinitions";
import { ILoginUser } from "../../interfaces/user/ILoginUser";
import { IAddUserRoleStatusRequest } from "../../interfaces/user/requestObjects/IAddUserRoleStatusRequest";
import { IUserRepository } from "../../../repository/interface/IUserRepository";
import { CustomError } from "../../../errorHandling/CustomError";
import db from "../../../models/sqlconfig";
import { verifyToken } from "../../../services/userservice";
import { createSecretKey } from "crypto";
import * as jose from "jose";
import { JWTVerifyResult } from "jose";
import crypto from "crypto";

export class LoginUserImpl implements ILoginUser {
  accessToken!: string;
  refreshToken!: string;
  user!: UserAttributes | null;
  loginUserRequest: LoginUserRequest;
  userRepository: IUserRepository;
  loginUserResponse!: LoginUserResponse;
  verifyTokenResponse!: VerifyTokenResponse;
  refreshTokenVerified: boolean = false;
  passwordMatch: boolean = false;
  secretKey: any;
  userRoleList: string[] = [];
  constructor(
    loginUserRequest: LoginUserRequest,
    userRepository: IUserRepository,
  ) {
    this.loginUserRequest = loginUserRequest;
    this.userRepository = userRepository;
  }
  async init() {
    if (
      this.loginUserRequest.userName != null &&
      this.loginUserRequest.userName != "" &&
      this.loginUserRequest.password != null &&
      this.loginUserRequest.password != ""
    ) {
      await this.loginByPassword();
    } else if (
      this.loginUserRequest.refreshToken != null &&
      this.loginUserRequest.refreshToken != ""
    ) {
      await this.loginByRefreshToken();
      await this.verifyRefreshToken();
    } else {
      throw new CustomError(
        "Please provide a password or refreshToken",
        "UC-LOGIN-01",
        "Please provide a password or refreshToken",
        false,
      );
    }

    await this.createAccessToken();
    await this.createRefreshToken();
    await this.findUserRoles();
  }
  async loginByPassword(): Promise<void> {
    this.user = await this.userRepository.findUserByUserName(
      this.loginUserRequest.userName,
    );

    if (this.user != null) {
      let passwordFields = this.user.password.split("$");
      let salt = passwordFields[0];
      let hash = crypto
        .createHmac("sha512", salt)
        .update(this.loginUserRequest.password)
        .digest("base64");
      if (hash === passwordFields[1]) {
        this.passwordMatch = true;
      } else {
        throw new CustomError(
          "The passwords do not match",
          "UC-LOGIN-01",
          "The passwords do not match",
          false,
        );
      }
    } else {
      throw new CustomError(
        "The passwords do not match",
        "UC-LOGIN-02",
        "The passwords do not match",
        false,
      );
    }
  }

  async verifyRefreshToken(): Promise<void> {
    // @ts-ignore
    const jwtSecret: string = process.env.JWT_SECRET;

    this.secretKey = createSecretKey(jwtSecret, "utf-8");

    // @ts-ignore
    await jose
      .jwtVerify(this.loginUserRequest.refreshToken!, this.secretKey, {
        issuer: "backend_admin",
        audience: "TaskManager",
      })
      .then((payload: JWTVerifyResult) => {
        this.verifyTokenResponse = {
          success: true,
          error: null,
          data: {
            // @ts-ignore
            userName: payload.payload.sub,
            // @ts-ignore
            expiresIn: payload.payload.exp,
            // @ts-ignore
            userId: payload.payload.userId,
          },
        };
      })
      .catch((error: any) => {
        throw new CustomError(
          "The token could not be verified",
          "UC-LOGIN-03",
          error.message,
          false,
        );
      });
  }

  async loginByRefreshToken(): Promise<void> {
    if (this.verifyTokenResponse.success) {
      this.refreshTokenVerified = true;

      if (this.verifyTokenResponse.data?.userId) {
        this.user = await this.userRepository.findUserById(
          this.verifyTokenResponse.data?.userId,
        );
      } else {
        throw new CustomError(
          "The token could not be verified",
          "UC-LOGIN-03",
          "The token could not be verified",
          false,
        );
      }
    } else {
      throw new CustomError(
        "The token could not be verified",
        "UC-LOGIN-03",
        "The token could not be verified",
        false,
      );
    }
  }

  async createAccessToken(): Promise<void> {
    // @ts-ignore
    const jwtSecret: string = process.env.JWT_SECRET;

    this.secretKey = createSecretKey(jwtSecret, "utf-8");

    this.accessToken = await new jose.SignJWT({
      // @ts-ignore
      userName: this.user.userName,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("backend_admin")
      .setAudience("TaskManager")
      // @ts-ignore
      .setSubject(this.user.userName)
      .setExpirationTime("10y")
      .sign(this.secretKey);
  }

  async createRefreshToken(): Promise<void> {
    this.refreshToken = await new jose.SignJWT({
      // @ts-ignore
      userId: this.user.id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("backend_admin")
      .setAudience("TaskManager")
      // @ts-ignore
      .setSubject(this.user.userName)
      .sign(this.secretKey);
  }

  async findUserRoles(): Promise<void> {
    // @ts-ignore
    this.userRoleList = await this.userRepository.findAllUserRolesByUserID(
      this.user.id,
    );
  }
}
