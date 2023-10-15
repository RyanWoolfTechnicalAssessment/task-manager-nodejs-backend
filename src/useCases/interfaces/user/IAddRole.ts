import {UserrolestatusAttributes} from "../../../models/userrolestatus";
import {IAddUserRoleStatusRequest} from "./IAddUserRoleStatusRequest";
import {RoleAttributes} from "../../../models/role";
import {IAddRoleRequest} from "./IAddRoleRequest";

export interface IAddRole{
    role: any;
    init(): Promise<void>;
    findRoleByAuthority(authority: string): Promise<RoleAttributes | null>;
    createRole(RoleRequest:IAddRoleRequest):Promise<RoleAttributes | null>;
}