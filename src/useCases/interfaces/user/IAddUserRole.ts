import { RoleAttributes } from "../../../models/role";
import { UserAttributes } from "../../../models/user";
import { UserrolestatusAttributes } from "../../../models/userrolestatus";
import {IAddUserRequest} from "./requestObjects/IAddUserRequest";
import {UserroleAttributes} from "../../../models/userrole";
import {IAddUserRoleRequest} from "./requestObjects/IAddUserRoleRequest";

export interface IAddUserRole {
    addUserRoleRequest:IAddUserRoleRequest | undefined;
    user: UserAttributes | null | undefined;
    role: RoleAttributes | null | undefined;
    userRole: UserroleAttributes;
    userRoleStatus: UserrolestatusAttributes;

    init(): Promise<void>;
    checkIfUserExists(): Promise<void>;
    checkIfRoleExists(): Promise<void>;
    getActiveUserRoleStatus(): Promise<void>;
    createUserRole():Promise<void>;
}