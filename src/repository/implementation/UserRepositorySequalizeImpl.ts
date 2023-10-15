import {UserrolestatusAttributes} from "../../models/userrolestatus";
import {IUserRepository} from "../interface/IUserRepository";
import db from "../../models/sqlconfig";
import {ErrorResponseHandler} from "../../errorHandling/errorResponseHandler";
import {IAddUserRoleStatusRequest} from "../../useCases/interfaces/user/IAddUserRoleStatusRequest";
import {RoleAttributes} from "../../models/role";
import {IAddRoleRequest} from "../../useCases/interfaces/user/IAddRoleRequest";


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

    async findRoleByAuthority(authority: string): Promise<RoleAttributes | null>{
        try{
            const role = await db.role.findOne({where: {
                    authority: authority,
                }})

            return role;
        }
        catch(err:any)
        {
            throw new ErrorResponseHandler("An error occurred while finding ","DB-ROL-01",err.message,false);
        }

    }

    async createRole(role: IAddRoleRequest | undefined): Promise<RoleAttributes | null>{

        try{
            const roleResponse = await db.role.create(role);
            return roleResponse;
        }
        catch(err:any){
            throw new ErrorResponseHandler("An error occurred while user role status","DB-URS-02",err.message,false);
        }

    };
}