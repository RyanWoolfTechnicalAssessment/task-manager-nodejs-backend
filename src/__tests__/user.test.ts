import {IUserRepository} from "../repository/interface/IUserRepository";
import {UserRepositoryMockImpl} from "../repository/implementation/UserRepositoryMockImpl";
import {AddUserRoleStatusMockImpl} from "../useCases/implementations/AddUserRoleStatusMockImpl";
import {IAddUserRoleStatus} from "../useCases/interfaces/IAddUserRoleStatus";


describe('add user role status', () =>{
    describe('given the user role status already exists it should return new user role status',  () => {
        it("should return an added item", async () => {
            const userRepository: IUserRepository = new UserRepositoryMockImpl();
            const activeUserrolestatus: { version: number; statusName: string; statusCode: string; } = {
                version: 1,
                statusCode: "doesNotExist",
                statusName: "Does Not Exist",
            };

            const addInActiveUserRoleStatus: IAddUserRoleStatus = new AddUserRoleStatusMockImpl(activeUserrolestatus, userRepository);
            await addInActiveUserRoleStatus.init();

            expect(addInActiveUserRoleStatus.userRoleStatus.statusName).toBe("Test Added Status Name");
        })

    })

    describe('given the user role status does not exist, it should return new user role status',  () => {
        it("should return an the existing item", async () => {
            const userRepository: IUserRepository = new UserRepositoryMockImpl();
            const activeUserrolestatus: { version: number; statusName: string; statusCode: string; } = {
                version: 1,
                statusCode: "exists",
                statusName: "Does Exist",
            };

            const addInActiveUserRoleStatus: IAddUserRoleStatus = new AddUserRoleStatusMockImpl(activeUserrolestatus, userRepository);
            await addInActiveUserRoleStatus.init();

            expect(addInActiveUserRoleStatus.userRoleStatus.statusName).toBe("Test Existing Status Name");
        })

    })
})
