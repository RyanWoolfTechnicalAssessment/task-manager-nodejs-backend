import {UserrolestatusAttributes} from "../../models/userrolestatus";
import {IUserRepository} from "../implementation/IUserRepository";
import db from "../../models/sqlconfig";
import {ErrorResponseHandler} from "../../errorHandling/errorResponseHandler";
import {IAddUserRoleStatusRequest} from "../../useCases/interfaces/IAddUserRoleStatusRequest";


export class UserRepositorySequalizeImpl implements IUserRepository {
    async findUserRoleStatusByStatusCode(statusCode: string): Promise<UserrolestatusAttributes | null>{
        try{
            const userRoleStatus = await db.userrolestatus.findOne({where: {
                    statusCode: statusCode,
                }})

            return userRoleStatus;
        }
        catch(err:any)
        {
            throw new ErrorResponseHandler("An error occurred while finding active user role status","DB-URS-01",err.message,false);
        }

    }

    async createUserRoleStatus(userRoleStatus: IAddUserRoleStatusRequest | undefined): Promise<UserrolestatusAttributes | null>{

        try{
            const userRoleStatusResponse = await db.userrolestatus.create(userRoleStatus);
            return userRoleStatusResponse;
        }
        catch(err:any){
            throw new ErrorResponseHandler("An error occurred while user role status","DB-URS-02",err.message,false);
        }

    };
}