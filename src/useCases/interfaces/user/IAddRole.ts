import { RoleAttributes } from "../../../models/role";

export interface IAddRole {
  role: any;
  init(): Promise<void>;
  findRoleByAuthority(authority: string): Promise<RoleAttributes | null>;
  createRole(): Promise<RoleAttributes | null>;
}
