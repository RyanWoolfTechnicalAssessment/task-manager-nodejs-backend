import {IAddUserRoleStatus} from "../../interfaces/user/IAddUserRoleStatus";
import {IAddUserRoleStatusRequest} from "../../interfaces/user/requestObjects/IAddUserRoleStatusRequest";
import {UserrolestatusAttributes} from "../../../models/userrolestatus";
import {IUserRepository} from "../../../repository/interface/IUserRepository";
import {IAddRole} from "../../interfaces/user/IAddRole";
import {IAddRoleRequest} from "../../interfaces/user/requestObjects/IAddRoleRequest";
import {RoleAttributes} from "../../../models/role";


export class AddRoleImpl implements IAddRole {

    addRoleRequest: IAddRoleRequest | undefined;
    role: RoleAttributes | null | undefined;
    userRepository:IUserRepository;
    constructor(addRoleRequest: IAddRoleRequest | undefined, userRepository:IUserRepository) {
        this.addRoleRequest = addRoleRequest;
        this.userRepository = userRepository;
    }
    async init(): Promise<void> {
        if (this.addRoleRequest) {
            const role = await this.findRoleByAuthority(this.addRoleRequest?.authority);

            if(role != null){
                this.role = role;
            }
            else
            {
                this.role = await this.createRole();
            }
        }

    }
    async createRole(): Promise<RoleAttributes | null> {
        return await this.userRepository.createRole(this.addRoleRequest);
    }

    async findRoleByAuthority(authority: string): Promise<RoleAttributes | null> {
        return await this.userRepository.findRoleByAuthority(authority);
    }

}