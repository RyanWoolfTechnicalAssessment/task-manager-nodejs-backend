import {IAddUserRoleStatus} from "../interfaces/IAddUserRoleStatus";
import {IAddUserRoleStatusRequest} from "../interfaces/IAddUserRoleStatusRequest";
import {UserrolestatusAttributes} from "../../models/userrolestatus";
import {IUserRepository} from "../../repository/interface/IUserRepository";


export class AddUserRoleStatusMockImpl implements IAddUserRoleStatus {

    addUserRoleStatusRequest: IAddUserRoleStatusRequest | undefined;
    userRoleStatus: UserrolestatusAttributes | null | undefined;
    userRepository:IUserRepository;
    constructor(addUserRoleStatusRequest: IAddUserRoleStatusRequest | undefined, userRepository:IUserRepository) {
        this.addUserRoleStatusRequest = addUserRoleStatusRequest;
        this.userRepository = userRepository;
    }
    async init(): Promise<void> {
        if (this.addUserRoleStatusRequest) {
            const userRoleStatus = await this.findUserRoleStatusByStatusCode(this.addUserRoleStatusRequest?.statusCode);

            if(userRoleStatus != null){
                this.userRoleStatus = userRoleStatus;
            }
            else
            {
                this.userRoleStatus = await this.createUserRoleStatus(this.addUserRoleStatusRequest);
            }
        }

    }
    async createUserRoleStatus(userRoleStatusRequest: IAddUserRoleStatusRequest): Promise<UserrolestatusAttributes | null> {
        return await this.userRepository.createUserRoleStatus(this.addUserRoleStatusRequest);
    }

    async findUserRoleStatusByStatusCode(statusCode: string): Promise<UserrolestatusAttributes | null> {
        return await this.userRepository.findUserRoleStatusByStatusCode(statusCode);
    }

}