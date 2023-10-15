import {UserrolestatusAttributes} from "../../models/userrolestatus";
import {IAddUserRoleStatusRequest} from "../../useCases/interfaces/user/IAddUserRoleStatusRequest";
import {RoleAttributes} from "../../models/role";
import {IAddRoleRequest} from "../../useCases/interfaces/user/IAddRoleRequest";

export interface IUserRepository {

    findUserRoleStatusByStatusCode(statusCode: string): Promise<UserrolestatusAttributes | null>;

    findRoleByAuthority(authority: string): Promise<RoleAttributes | null>;

    createUserRoleStatus(userRoleStatus: IAddUserRoleStatusRequest | undefined):Promise<UserrolestatusAttributes | null>;

    createRole(role: IAddRoleRequest | undefined):Promise<RoleAttributes | null>;
}