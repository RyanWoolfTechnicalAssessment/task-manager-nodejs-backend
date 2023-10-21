import { UserrolestatusAttributes } from "../models/userrolestatus";
import db from "../models/sqlconfig";
import { ErrorResponseHandler } from "../errorHandling/errorResponseHandler";
import { IUserRepository } from "../repository/interface/IUserRepository";
import { UserRepositorySequalizeImpl } from "../repository/implementation/UserRepositorySequalizeImpl";
import { IAddUserRoleStatus } from "../useCases/interfaces/user/IAddUserRoleStatus";
import { AddUserRoleStatusImpl } from "../useCases/implementations/user/AddUserRoleStatusImpl";
import { AddRoleImpl } from "../useCases/implementations/user/AddRoleImpl";
import { IAddRole } from "../useCases/interfaces/user/IAddRole";
import { IAddUserRequest } from "../useCases/interfaces/user/requestObjects/IAddUserRequest";
import { IAddUser } from "../useCases/interfaces/user/IAddUser";
import { AddUserImpl } from "../useCases/implementations/user/AddUserImpl";

export async function populateDatabase(): Promise<void> {
  await populateUserRoleStatus();
  await populateRole();

  await populateAdminUser();
  //Populate admin user
  //Populate admin user role
  return;
}

async function populateUserRoleStatus(): Promise<void> {
  const userRepository: IUserRepository = new UserRepositorySequalizeImpl();
  const activeUserrolestatus: {
    version: number;
    statusName: string;
    statusCode: string;
  } = {
    version: 1,
    statusCode: "ACTIVE",
    statusName: "ACTIVE",
  };
  const inActiveUserrolestatus: {
    version: number;
    statusCode: string;
    statusName: string;
  } = {
    version: 1,
    statusCode: "IN-ACTIVE",
    statusName: "IN-ACTIVE",
  };
  const addActiveUserRoleStatus: IAddUserRoleStatus = new AddUserRoleStatusImpl(
    activeUserrolestatus,
    userRepository,
  );
  await addActiveUserRoleStatus.init();
  const addInActiveUserRoleStatus: IAddUserRoleStatus =
    new AddUserRoleStatusImpl(inActiveUserrolestatus, userRepository);
  await addInActiveUserRoleStatus.init();

  return;
}

interface IAppRoles {
  version: number;
  authority: string;
  displayName: string;
}

async function populateRole(): Promise<void> {
  const userRepository: IUserRepository = new UserRepositorySequalizeImpl();
  const roleList: IAppRoles[] = [
    {
      version: 1,
      authority: "ROLE_ADMIN",
      displayName: "Admin",
    },
    {
      version: 1,
      authority: "ROLE_CLIENT",
      displayName: "Client",
    },
  ];

  for (const roleListIndex in roleList) {
    const addRole: IAddRole = new AddRoleImpl(
      roleList[roleListIndex],
      userRepository,
    );
    await addRole.init();
  }

  return;
}

async function populateAdminUser() {
  console.log(`in populateAdminUser`);
  const registerUserRequest: IAddUserRequest = {
    userName: "administrator@ryanwoolf.com",
    password: "JUkmxSgnnqTWX4$pRXr3gB^skY6Ao$%X",
    enabled: true,
    lastLogin: new Date(),
  };

  const userRepository: IUserRepository = new UserRepositorySequalizeImpl();

  try {
    const addUser: IAddUser = new AddUserImpl(
      registerUserRequest,
      userRepository,
    );
    await addUser.init();
  } catch (err: any) {
    console.log(`There was an error adding admin user:${err.message}`);
  }
}
