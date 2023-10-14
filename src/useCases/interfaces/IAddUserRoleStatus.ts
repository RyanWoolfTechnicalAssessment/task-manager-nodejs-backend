import {UserrolestatusAttributes} from "../../models/userrolestatus";
import {IAddUserRoleStatusRequest} from "./IAddUserRoleStatusRequest";

export interface IAddUserRoleStatus{
    init(): Promise<void>;
    findUserRoleStatusByStatusCode(statusCode: string): Promise<UserrolestatusAttributes | null>;
    createUserRoleStatus(userRoleStatusRequest:IAddUserRoleStatusRequest):Promise<UserrolestatusAttributes | null>;
}