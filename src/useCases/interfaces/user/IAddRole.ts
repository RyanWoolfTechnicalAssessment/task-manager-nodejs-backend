import { UserrolestatusAttributes } from "../../../models/userrolestatus";
import { IAddUserRoleStatusRequest } from "./requestObjects/IAddUserRoleStatusRequest";
import { RoleAttributes } from "../../../models/role";
import { IAddRoleRequest } from "./requestObjects/IAddRoleRequest";

export interface IAddRole {
  role: any;
  init(): Promise<void>;
  findRoleByAuthority(authority: string): Promise<RoleAttributes | null>;
  createRole(): Promise<RoleAttributes | null>;
}
