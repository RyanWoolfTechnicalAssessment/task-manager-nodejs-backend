import {UserrolestatusAttributes} from "../models/userrolestatus";
import db from "../models/sqlconfig";
import {ErrorResponseHandler} from "../errorHandling/errorResponseHandler";
import {IUserRepository} from "../repository/implementation/IUserRepository";
import {UserRepositorySequalizeImpl} from "../repository/interface/UserRepositorySequalizeImpl";

export async function populateDatabase():Promise<void>{

    await populateThirdPartySystemRoleStatus();
    //Populate roles
    //Populate admin user
    //Populate admin user role
    return;

}

async function populateThirdPartySystemRoleStatus():Promise<void>{
    let activeUserrolestatusModel:UserrolestatusAttributes|null=null;
    const userRepository:IUserRepository = new UserRepositorySequalizeImpl();
    const activeUserrolestatus:{ version: number; statusName: string; statusCode: string; }={
        version: 1,
        statusCode: "ACTIVE",
        statusName: "ACTIVE",
    };

    let inActiveUserrolestatusModel:UserrolestatusAttributes|null=null;
    const inActiveUserrolestatus:{ version: number; statusCode: string; statusName: string }={
        version: 1,
        statusCode: "IN-ACTIVE",
        statusName: "IN-ACTIVE"
    };

    activeUserrolestatusModel = await userRepository.findUserRoleStatusByStatusCode(activeUserrolestatus.statusCode);

    if (activeUserrolestatusModel==null) {
        await userRepository.createUserRoleStatus(activeUserrolestatus);
    }

   inActiveUserrolestatusModel = await userRepository.findUserRoleStatusByStatusCode(inActiveUserrolestatus.statusCode);

    if (inActiveUserrolestatusModel==null) {
        await userRepository.createUserRoleStatus(inActiveUserrolestatus);
    }

    return;
}