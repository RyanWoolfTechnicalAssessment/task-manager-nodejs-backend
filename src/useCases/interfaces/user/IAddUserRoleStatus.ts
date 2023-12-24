import { UserrolestatusAttributes } from "../../../models/userrolestatus";

export interface IAddUserRoleStatus {
  userRoleStatus: any;
  init(): Promise<void>;
  findUserRoleStatusByStatusCode(
    statusCode: string,
  ): Promise<UserrolestatusAttributes | null>;
  createUserRoleStatus(): Promise<UserrolestatusAttributes | null>;
}
