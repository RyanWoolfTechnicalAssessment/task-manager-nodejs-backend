import {UserrolestatusAttributes} from "../../models/userrolestatus";
import {IAddUserRoleStatusRequest} from "../../useCases/interfaces/IAddUserRoleStatusRequest";

export interface IUserRepository {

    findUserRoleStatusByStatusCode(statusCode: string): Promise<UserrolestatusAttributes | null>;

    createUserRoleStatus(userRoleStatus: IAddUserRoleStatusRequest | undefined):Promise<UserrolestatusAttributes | null>;
}