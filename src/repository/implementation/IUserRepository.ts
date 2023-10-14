import {UserrolestatusAttributes} from "../../models/userrolestatus";

export interface IUserRepository {
    findUserRoleStatusByStatusCode(statusCode: string): Promise<UserrolestatusAttributes | null>;
    createUserRoleStatus(userRoleStatus:{ version: number; statusCode: string; statusName: string }):Promise<UserrolestatusAttributes | null>;
}