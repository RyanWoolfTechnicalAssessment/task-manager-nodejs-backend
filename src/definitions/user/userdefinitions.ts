import { UserAttributes } from "../../models/user";

export interface RegisterUserResponse {
  success: boolean;
  error: string | null;
  errorCode: string | null;
  errorList: string[] | null;
  data: UserAttributes | null | undefined;
}

export interface User {
  id: number;
  userName: string;
}

export interface VerifyTokenResponse {
  success: boolean;
  error: string | null;
  data: {
    userName: string;
    expiresIn: number | null;
    thirdPartySystemId: number | null;
  } | null;
}

export interface RegisterUserRequest {
  userName: string;
  password: string;
  thirdPartyMemberId?: string | null;
}

export interface LoginUserResponse {
  success: boolean;
  error: string | null;
  errorCode: string | null;
  errorList: string[] | null;
  data: {
    userName: string;
    access_token: string;
    refresh_token: string;
    roleList: string[];
  } | null;
}

export interface LoginUserRequest {
  userName: string;
  password: string;
  refreshToken: string | null;
}
