import {UserrolestatusAttributes} from "../models/userrolestatus";
import db from "../models/sqlconfig";
import {ErrorResponseHandler} from "../errorHandling/errorResponseHandler";
import {IUserRepository} from "../repository/implementation/IUserRepository";
import {UserRepositorySequalizeImpl} from "../repository/interface/UserRepositorySequalizeImpl";
import {IAddUserRoleStatus} from "../useCases/interfaces/IAddUserRoleStatus";
import {IAddUserRoleStatusImpl} from "../useCases/implementations/AddUserRoleStatusImpl";

export async function populateDatabase():Promise<void>{

    await populateThirdPartySystemRoleStatus();
    //Populate roles
    //Populate admin user
    //Populate admin user role
    return;

}

async function populateThirdPartySystemRoleStatus():Promise<void>{

    const userRepository:IUserRepository = new UserRepositorySequalizeImpl();
    const activeUserrolestatus:{ version: number; statusName: string; statusCode: string; }={
        version: 1,
        statusCode: "ACTIVE",
        statusName: "ACTIVE",
    };
    const inActiveUserrolestatus:{ version: number; statusCode: string; statusName: string }={
        version: 1,
        statusCode: "IN-ACTIVE",
        statusName: "IN-ACTIVE"
    };
    const addActiveUserRoleStatus:IAddUserRoleStatus = new IAddUserRoleStatusImpl(activeUserrolestatus,userRepository);
    await addActiveUserRoleStatus.init();
    const addInActiveUserRoleStatus:IAddUserRoleStatus = new IAddUserRoleStatusImpl(inActiveUserrolestatus,userRepository);
    await addInActiveUserRoleStatus.init();

    return;
}