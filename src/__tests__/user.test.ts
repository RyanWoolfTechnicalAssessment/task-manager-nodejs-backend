import {IUserRepository} from "../repository/interface/IUserRepository";
import {UserRepositoryMockImpl} from "../repository/implementation/UserRepositoryMockImpl";
import {IAddUserRoleStatus} from "../useCases/interfaces/user/IAddUserRoleStatus";
import {AddUserRoleStatusImpl} from "../useCases/implementations/user/AddUserRoleStatusImpl";
import {AddRoleImpl} from "../useCases/implementations/user/AddRoleImpl";
import {IAddRole} from "../useCases/interfaces/user/IAddRole";


describe('add user role status', () =>{
    describe('given the user role status does not exist it should return new user role status',  () => {
        it("should return an added item", async () => {
            const userRepository: IUserRepository = new UserRepositoryMockImpl();
            const createUserRoleStatus = jest.fn();
            const doesNotExistUserrolestatus: { version: number; statusName: string; statusCode: string; } = {
                version: 1,
                statusCode: "doesNotExist",
                statusName: "Does Not Exist",
            };

            const doesNotExistUserRoleStatus: IAddUserRoleStatus = new AddUserRoleStatusImpl(doesNotExistUserrolestatus, userRepository);
            await doesNotExistUserRoleStatus.init();

            expect(doesNotExistUserRoleStatus.userRoleStatus.statusName).toBe("Test Added Status Name");
            expect(doesNotExistUserRoleStatus.createUserRoleStatus()).toHaveBeenCalled();
        });

    })

    describe('given the user role status does exist, it should return the current user role status',  () => {
        it("should return an the existing item", async () => {
            const userRepository: IUserRepository = new UserRepositoryMockImpl();
            const existingUserrolestatus: { version: number; statusName: string; statusCode: string; } = {
                version: 1,
                statusCode: "exists",
                statusName: "Does Exist",
            };

            const existingUserRoleStatus: IAddUserRoleStatus = new AddUserRoleStatusImpl(existingUserrolestatus, userRepository);
            await existingUserRoleStatus.init();

            expect(existingUserRoleStatus.userRoleStatus.statusName).toBe("Test Existing Status Name");
            expect(existingUserRoleStatus.createUserRoleStatus()).not.toHaveBeenCalled();
        });

    })
})


describe('add role', () =>{
    describe('given the role does not exist, it should return new user role status',  () => {
        it("should return an added item", async () => {
            const userRepository: IUserRepository = new UserRepositoryMockImpl();
            const doesNotExistRole: { displayName: string; authority: string;} = {
                displayName: "doesNotExist",
                authority: "doesNotExist",
            };

            const doesNotExistRoleRequest: IAddRole = new AddRoleImpl(doesNotExistRole, userRepository);
            await doesNotExistRoleRequest.init();

            expect(doesNotExistRoleRequest.role.authority).toBe("Test Added Role Authority");
            expect(doesNotExistRoleRequest.createRole()).toHaveBeenCalled();
        });

    })

    describe('given the role exists, it should return the current role',  () => {
        it("should return an the existing item", async () => {
            const userRepository: IUserRepository = new UserRepositoryMockImpl();
            const createUserRoleStatus = jest.fn();
            const existingUserrolestatus: { version: number; statusName: string; statusCode: string; } = {
                version: 1,
                statusCode: "exists",
                statusName: "Does Exist",
            };

            const existingUserRoleStatus: IAddUserRoleStatus = new AddUserRoleStatusImpl(existingUserrolestatus, userRepository);
            await existingUserRoleStatus.init();

            expect(existingUserRoleStatus.userRoleStatus.statusName).toBe("Test Existing Status Name");
            expect(existingUserRoleStatus.createUserRoleStatus()).not.toHaveBeenCalled();
        });

    })
})
