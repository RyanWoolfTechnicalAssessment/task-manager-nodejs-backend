import { IUserRepository } from "../../../repository/interface/IUserRepository";
import { IAddRoleRequest } from "../../interfaces/user/requestObjects/IAddRoleRequest";
import { RoleAttributes } from "../../../models/role";
import { IAddUserRole } from "../../interfaces/user/IAddUserRole";
import { UserAttributes } from "../../../models/user";
import { IAddUserRoleRequest } from "../../interfaces/user/requestObjects/IAddUserRoleRequest";
import db from "../../../models/sqlconfig";
import { UserroleInputAttributes } from "../../../models/userrole";

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
    await this.createUserRole();
  }

  async checkIfRoleExists(): Promise<void> {

      this.role = await this.userRepository.findRoleByAuthority(
        this.addUserRoleRequest?.authority,
      );
  }

  async checkIfUserExists(): Promise<void> {
      this.user = await this.userRepository.findUserByUserName(
        this.addUserRoleRequest?.userName,
      );
  }

  async getActiveUserRoleStatus(): Promise<void> {
    this.userRoleStatus =
      await this.userRepository.findUserRoleStatusByStatusCode("ACTIVE");
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
}
