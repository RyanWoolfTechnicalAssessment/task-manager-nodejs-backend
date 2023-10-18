import {UserrolestatusAttributes} from "../../../models/userrolestatus";
import {IAddUserRoleStatusRequest} from "./requestObjects/IAddUserRoleStatusRequest";

export interface IAddUserRoleStatus{
    userRoleStatus: any;
    init(): Promise<void>;
    findUserRoleStatusByStatusCode(statusCode: string): Promise<UserrolestatusAttributes | null>;
    createUserRoleStatus():Promise<UserrolestatusAttributes | null>;
}