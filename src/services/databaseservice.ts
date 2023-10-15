import {UserrolestatusAttributes} from "../models/userrolestatus";
import db from "../models/sqlconfig";
import {ErrorResponseHandler} from "../errorHandling/errorResponseHandler";
import {IUserRepository} from "../repository/interface/IUserRepository";
import {UserRepositorySequalizeImpl} from "../repository/implementation/UserRepositorySequalizeImpl";
import {IAddUserRoleStatus} from "../useCases/interfaces/user/IAddUserRoleStatus";
import {AddUserRoleStatusImpl} from "../useCases/implementations/user/AddUserRoleStatusImpl";
import {AddRoleImpl} from "../useCases/implementations/user/AddRoleImpl";
import {IAddRole} from "../useCases/interfaces/user/IAddRole";

export async function populateDatabase():Promise<void>{

    await populateUserRoleStatus();
    await populateRole();
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

async function populateRoles():Promise<void>{

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

interface IAppRoles {
    version: number;
    authority: string;
    displayName: string;
}

async function populateRole():Promise<void>{

    const userRepository:IUserRepository = new UserRepositorySequalizeImpl();
    const roleList:IAppRoles[]=[

        {
            version: 1,
            authority: "ROLE_ADMIN",
            displayName: "Admin",
        },
        {
            version: 1,
            authority: "ROLE_CLIENT",
            displayName: "Fine Veiwer",
        },

    ];



    for(const roleListIndex in roleList){
        const addRole:IAddRole = new AddRoleImpl(roleList[roleListIndex],userRepository);
        await addRole.init();
    }

    return;
}