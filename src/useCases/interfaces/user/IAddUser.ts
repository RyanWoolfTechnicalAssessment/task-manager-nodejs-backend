import { RoleAttributes } from "../../../models/role";
import { UserAttributes } from "../../../models/user";
import { UserrolestatusAttributes } from "../../../models/userrolestatus";
import { IAddUserRequest } from "./requestObjects/IAddUserRequest";

export interface IAddUser {
  addUserRequest: IAddUserRequest;
  hashedPassword: string | undefined;
  user: UserAttributes | undefined | null;

  init(): Promise<void>;
  checkIfUserExists(): Promise<void>;
  saltAndHashPassword(): Promise<void>;
  createUser(): Promise<void>;
}
