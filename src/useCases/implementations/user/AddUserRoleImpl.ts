import { IUserRepository } from "../../../repository/interface/IUserRepository";
import { IAddRoleRequest } from "../../interfaces/user/requestObjects/IAddRoleRequest";
import { RoleAttributes } from "../../../models/role";
import { IAddUserRole } from "../../interfaces/user/IAddUserRole";
import { UserAttributes } from "../../../models/user";
import { IAddUserRoleRequest } from "../../interfaces/user/requestObjects/IAddUserRoleRequest";
import db from "../../../models/sqlconfig";
import { UserroleInputAttributes } from "../../../models/userrole";
import { CustomError } from "../../../errorHandling/CustomError";

export class AddUserRoleImpl implements IAddUserRole {
  userRepository: IUserRepository;
  addUserRoleRequest: IAddUserRoleRequest;
  role: RoleAttributes | null | undefined;
  user: UserAttributes | null | undefined;
  userRole: any;
  userRoleStatus: any;
  constructor(
    addUserRoleRequest: IAddUserRoleRequest,
    userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
    this.addUserRoleRequest = addUserRoleRequest;
  }
  async init(): Promise<void> {
    await this.checkIfRoleExists();
    await this.checkIfUserExists();
    await this.getActiveUserRoleStatus();
    await this.checkUserRoleExists();
    if (!this.userRole) {
      //If it already exists, create it
      await this.createUserRole();
    }
  }

  async checkIfRoleExists(): Promise<void> {
    this.role = await this.userRepository.findRoleByAuthority(
      this.addUserRoleRequest?.authority,
    );

    if (!this.role) {
      throw new CustomError(
        "Sorry, we could not find a role to add a user role",
        "UC-USRROL-03",
        "Sorry, we could not find a role to add a user role",
        false,
      );
    }
  }

  async checkIfUserExists(): Promise<void> {
    this.user = await this.userRepository.findUserByUserName(
      this.addUserRoleRequest?.userName,
    );

    if (!this.user) {
      throw new CustomError(
        "Sorry, we could not find a user to add a user role",
        "UC-USRROL-01",
        "Sorry, we could not find a user to add a user role",
        false,
      );
    }
  }

  async getActiveUserRoleStatus(): Promise<void> {
    this.userRoleStatus =
      await this.userRepository.findUserRoleStatusByStatusCode("ACTIVE");

    if (!this.userRoleStatus) {
      throw new CustomError(
        "Sorry, we could not find a user role status to add a user role",
        "UC-USRROL-02",
        "Sorry, we could not find a user role status to add a user role",
        false,
      );
    }
  }

  async createUserRole(): Promise<void> {
    if (this.user != null && this.role != null && this.userRoleStatus != null) {
      const userRoleInputAttributes: UserroleInputAttributes = {
        userId: this.user.id,
        roleId: this.role.id,
        statusId: this.userRoleStatus.id,
      };
      this.userRole = await this.userRepository.createUserRole(
        userRoleInputAttributes,
      );
    }
  }

  async checkUserRoleExists(): Promise<void> {
    if (this.user != null && this.role != null && this.userRoleStatus != null) {
      const userRoleInputAttributes: UserroleInputAttributes = {
        userId: this.user.id,
        roleId: this.role.id,
        statusId: this.userRoleStatus.id,
      };
      this.userRole = await this.userRepository.findUserRoleByAllAttributes(
        userRoleInputAttributes,
      );
    }
  }
}
