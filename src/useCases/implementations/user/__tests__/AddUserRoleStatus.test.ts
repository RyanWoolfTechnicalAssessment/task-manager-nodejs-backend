import {IUserRepository} from "../../../../repository/interface/IUserRepository";
import {UserRepositoryMockImpl} from "../../../../repository/implementation/UserRepositoryMockImpl";
import {IAddUserRoleStatus} from "../../../interfaces/user/IAddUserRoleStatus";
import {AddUserRoleStatusImpl} from "../AddUserRoleStatusImpl";

describe("add user role status", () => {
    describe("given the user role status does not exist it should return new user role status", () => {
        it("should return an added item", async () => {
            const userRepository: IUserRepository = new UserRepositoryMockImpl();
            const doesNotExistUserrolestatus: {
                version: number;
                statusName: string;
                statusCode: string;
            } = {
                version: 1,
                statusCode: "doesNotExist",
                statusName: "Does Not Exist",
            };

            const doesNotExistUserRoleStatus: IAddUserRoleStatus =
                new AddUserRoleStatusImpl(doesNotExistUserrolestatus, userRepository);
            await doesNotExistUserRoleStatus.init();

            expect(doesNotExistUserRoleStatus.userRoleStatus.statusName).toBe(
                "Test Added Status Name",
            );
            // Todo could not get this to work, Matcher error: received value must be a mock or spy function
            // expect(doesNotExistUserRoleStatus.createUserRoleStatus()).toHaveBeenCalled();
        });
    });

    describe("given the user role status does exist, it should return the current user role status", () => {
        it("should return an the existing item", async () => {
            const userRepository: IUserRepository = new UserRepositoryMockImpl();
            const existingUserrolestatus: {
                version: number;
                statusName: string;
                statusCode: string;
            } = {
                version: 1,
                statusCode: "exists",
                statusName: "Does Exist",
            };

            const existingUserRoleStatus: IAddUserRoleStatus =
                new AddUserRoleStatusImpl(existingUserrolestatus, userRepository);
            await existingUserRoleStatus.init();

            expect(existingUserRoleStatus.userRoleStatus.statusName).toBe(
                "Test Existing Status Name",
            );
            // Todo could not get this to work, Matcher error: received value must be a mock or spy function
            // expect(existingUserRoleStatus.createUserRoleStatus()).not.toHaveBeenCalled();
        });
    });
});
