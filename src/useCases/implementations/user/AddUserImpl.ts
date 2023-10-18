
import { ErrorResponseHandler } from "../../../errorHandling/errorResponseHandler";
import { RoleAttributes } from "../../../models/role";
import { UserAttributes } from "../../../models/user";
import { UserrolestatusAttributes } from "../../../models/userrolestatus";
import { IUserRepository } from "../../../repository/interface/IUserRepository";
import { IAddUser } from "../../interfaces/user/IAddUser";
import * as crypto from "crypto";
import {IAddUserRequest} from "../../interfaces/user/requestObjects/IAddUserRequest";


export class AddUserImpl implements IAddUser {
    addUserRequest: IAddUserRequest;
    hashedPassword: string | undefined;
    user: UserAttributes | undefined;
    activeRoleStatus: UserrolestatusAttributes | undefined | null;
    applicableRoles: RoleAttributes[] | undefined;
    userRepository:IUserRepository;
    // roleList:RoleAttributes[] | null;

    constructor(addUserRequest: IAddUserRequest,userRepository:IUserRepository){

        console.log(`in add user constructor`);
        this.userRepository = userRepository;
        this.addUserRequest = addUserRequest;
    }

    async init(): Promise<void> {
        console.log(`in add user init`);
        await this.checkIfUserExists();
        await this.saltAndHashPassword();
        await this.createUser()
    }
    async checkIfUserExists(): Promise<void> {
        const foundUser = await this.userRepository.findUserByUserName(this.addUserRequest.userName);
        if(foundUser!=null){
            throw new ErrorResponseHandler("A user with this username already exists","UC-RUCIUE-01","A user with this username already exists",false);
        }
    }
    async saltAndHashPassword(): Promise<void> {

        if(this.addUserRequest&&this.addUserRequest.password){
            let result:string;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(this.addUserRequest.password).digest("base64");
            this.hashedPassword = salt + "$" + hash;
        }
        else{
            throw new ErrorResponseHandler("Password cannot be empty","UC-RUSHP-02","Password cannot be empty",false);
        }
    
    }
    async createUser(): Promise<void> {

        if(this.addUserRequest.userName&&this.hashedPassword){
            const newUser={
                userName: this.addUserRequest.userName,
                password: this.hashedPassword,
                enabled: true,
                lastLogin: new Date()
            };

            await this.userRepository.createUser(newUser);
        }
        else{
            throw new ErrorResponseHandler("Username or Password cannot be empty","UC-RUSHP-03","Username or Password cannot be empty",false);
        }

    }


}