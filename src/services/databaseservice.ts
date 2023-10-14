import {UserrolestatusAttributes} from "../models/userrolestatus";
import db from "../models/sqlconfig";
import {ErrorResponseHandler} from "../errorHandling/errorResponseHandler";
import {IUserRepository} from "../repository/interface/IUserRepository";
import {UserRepositorySequalizeImpl} from "../repository/implementation/UserRepositorySequalizeImpl";
import {IAddUserRoleStatus} from "../useCases/interfaces/IAddUserRoleStatus";
import {AddUserRoleStatusImpl} from "../useCases/implementations/AddUserRoleStatusImpl";

export async function populateDatabase():Promise<void>{

    await populateUserRoleStatus();
    //Populate roles
    //Populate admin user
    //Populate admin user role
    return;

}

async function populateUserRoleStatus():Promise<void>{

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
    const addActiveUserRoleStatus:IAddUserRoleStatus = new AddUserRoleStatusImpl(activeUserrolestatus,userRepository);
    await addActiveUserRoleStatus.init();
    const addInActiveUserRoleStatus:IAddUserRoleStatus = new AddUserRoleStatusImpl(inActiveUserrolestatus,userRepository);
    await addInActiveUserRoleStatus.init();

    return;
}