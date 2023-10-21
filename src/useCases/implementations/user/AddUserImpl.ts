import { ErrorResponseHandler } from "../../../errorHandling/errorResponseHandler";
import { RoleAttributes } from "../../../models/role";
import { UserAttributes } from "../../../models/user";
import { UserrolestatusAttributes } from "../../../models/userrolestatus";
import { IUserRepository } from "../../../repository/interface/IUserRepository";
import { IAddUser } from "../../interfaces/user/IAddUser";
import * as crypto from "crypto";
import { IAddUserRequest } from "../../interfaces/user/requestObjects/IAddUserRequest";

export class AddUserImpl implements IAddUser {
  addUserRequest: IAddUserRequest;
  hashedPassword: string = '';
  user: UserAttributes | null | undefined;
  userRepository: IUserRepository;
  // roleList:RoleAttributes[] | null;

  constructor(
    addUserRequest: IAddUserRequest,
    userRepository: IUserRepository,
  ) {
    console.log(`in add user constructor`);
    this.userRepository = userRepository;
    this.addUserRequest = addUserRequest;
  }

  async init(): Promise<void> {
    console.log(`in add user init`);
    await this.checkIfUserExists();
    await this.saltAndHashPassword();
    await this.createUser();
  }
  async checkIfUserExists(): Promise<void> {
    const foundUser = await this.userRepository.findUserByUserName(
      this.addUserRequest.userName,
    );
    if (foundUser != null) {
      throw new ErrorResponseHandler(
        "A user with this username already exists",
        "UC-RUCIUE-01",
        "A user with this username already exists",
        false,
      );
    }
  }
  async saltAndHashPassword(): Promise<void> {
      let salt = crypto.randomBytes(16).toString("base64");
      let hash = crypto
        .createHmac("sha512", salt)
        .update(this.addUserRequest.password)
        .digest("base64");
      this.hashedPassword = salt + "$" + hash;
  }
  async createUser(): Promise<void> {
      const newUser = {
        userName: this.addUserRequest.userName,
        password: this.hashedPassword,
        enabled: true,
        lastLogin: new Date(),
      };

      this.user = await this.userRepository.createUser(newUser);
  }
}
