import {UserrolestatusAttributes} from "../../../models/userrolestatus";
import {IAddUserRoleStatusRequest} from "./requestObjects/IAddUserRoleStatusRequest";
import {RoleAttributes} from "../../../models/role";
import {IAddRoleRequest} from "./requestObjects/IAddRoleRequest";

export interface IAddUserRole{
    userRole: any;
    init(): Promise<void>;
    findRoleById(): Promise<RoleAttributes | null>;
    findUserById(): Promise<RoleAttributes | null>;
    createUserRole():Promise<RoleAttributes | null>;
}