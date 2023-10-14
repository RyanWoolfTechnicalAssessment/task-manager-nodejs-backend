import {UserrolestatusAttributes} from "../../models/userrolestatus";
import {IUserRepository} from "../interface/IUserRepository";
import db from "../../models/sqlconfig";
import {ErrorResponseHandler} from "../../errorHandling/errorResponseHandler";
import {IAddUserRoleStatusRequest} from "../../useCases/interfaces/IAddUserRoleStatusRequest";


export class UserRepositoryMockImpl implements IUserRepository {
    async findUserRoleStatusByStatusCode(statusCode: string): Promise<UserrolestatusAttributes | null>{
        try{
            if(statusCode=='doesNotExist'){
                return null;
            }
            else
            {
                return {
                    id: 1,
                    statusCode: 'Test Existing Status Code',
                    statusName: 'Test Existing Status Name'
                }
            }
        }
        catch(err:any)
        {
            throw new ErrorResponseHandler("An error occurred while finding active user role status","DB-URS-01",err.message,false);
        }

    }

    async createUserRoleStatus(userRoleStatus: IAddUserRoleStatusRequest | undefined): Promise<UserrolestatusAttributes | null>{

        try{
            const userRoleStatusResponse = {
                id: 1,
                statusCode: 'Test Added Status Code',
                statusName: 'Test Added Status Name'
            };
            return userRoleStatusResponse;
        }
        catch(err:any){
            throw new ErrorResponseHandler("An error occurred while user role status","DB-URS-02",err.message,false);
        }

    };
}