import { UserrolestatusAttributes } from "../../../models/userrolestatus";
import {
  LoginUserRequest,
  LoginUserResponse,
  VerifyTokenResponse,
} from "../../../interfaces/user/user";
import { UserAttributes } from "../../../models/user";
import { IUserRepository } from "../../../repository/interface/IUserRepository";

export interface ILoginUser {
  accessToken: string;
  refreshToken: string;
  user: UserAttributes | null;
  loginUserRequest: LoginUserRequest;
  userRepository: IUserRepository;
  loginUserResponse: LoginUserResponse;
  verifyTokenResponse: VerifyTokenResponse;
  userRoleList: string[];
  init(): Promise<void>;
  loginByPassword(): Promise<void>;
  loginByRefreshToken(): Promise<void>;
  verifyRefreshToken(): Promise<void>;
  createAccessToken(): Promise<void>;
  createRefreshToken(): Promise<void>;
  assignUserRoles(): Promise<void>;
}
