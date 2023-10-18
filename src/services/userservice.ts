import {createSecretKey} from "crypto";
import db from "../models/sqlconfig";
import {Model, Op} from "sequelize";
import * as crypto from "crypto";
import {RegisterUserRequest, RegisterUserResponse, User} from "../definitions/user/userdefinitions";
import {IAddUser} from "../useCases/interfaces/user/IAddUser";
import {AddUserImpl} from "../useCases/implementations/user/AddUserImpl";
import {IAddUserRequest} from "../useCases/interfaces/user/requestObjects/IAddUserRequest";
import {IUserRepository} from "../repository/interface/IUserRepository";
import {UserRepositorySequalizeImpl} from "../repository/implementation/UserRepositorySequalizeImpl";
const jose = require('jose');
const log4js = require("log4js");

let logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

// export async function verifyToken(token:string): Promise<VerifyTokenResponse> {
//
//     let verifyTokenResponse:VerifyTokenResponse;
//     let jwtSecret:string;
//
//     //TODO sort out this any - Pieter Meyer
//     let secretKey: any;
//
//     // @ts-ignore
//     jwtSecret=process.env.JWT_SECRET;
//     logger.debug(`jwtSecret:${jwtSecret}`);
//
//     secretKey = createSecretKey(jwtSecret, 'utf-8');
//
//     await jose.jwtVerify(token, secretKey, {
//         issuer: 'backend_admin',
//         audience: 'FinesMicroservice',
//     }).then((payload:JWTVerifyResult)=>{
//
//         logger.debug(`payload:${JSON.stringify(payload)}`);
//         logger.debug(`payload.payload.sub:${JSON.stringify(payload.payload.sub)}`);
//         logger.debug(`payload.payload.thirdPartySystemId:${JSON.stringify(payload.payload.thirdPartySystemId)}`);
//
//         verifyTokenResponse={
//             success: true,
//             error: null,
//             data: {
//                 // @ts-ignore
//                 userName: payload.payload.sub,
//                 // @ts-ignore
//                 expiresIn: payload.payload.exp,
//                 // @ts-ignore
//                 thirdPartySystemId: payload.payload.thirdPartySystemId,
//             }
//         }
//
//
//     }).catch((error:any)=>{
//         //TODO sort out this any - Pieter Meyer
//
//         verifyTokenResponse={
//             success: false,
//             error: error.message,
//             data: null
//         }
//
//     });
//
//     // @ts-ignore
//     return verifyTokenResponse;
//
// }

export async function registerUser(registerUserRequest:RegisterUserRequest,assignRoleList:Array<string>): Promise<RegisterUserResponse> {

    logger.debug(`assignRoleList:${assignRoleList}`);
    const userRepository:IUserRepository = new UserRepositorySequalizeImpl();
    logger.debug(`in register user`);


    const userObject:IAddUserRequest = {
        userName: registerUserRequest.userName,
        // @ts-ignore
        password: registerUserRequest.password,
        enabled: true,
        lastLogin: new Date()
    }
    const addUser:IAddUser = new AddUserImpl(userObject,userRepository);
    await addUser.init()

    return {
        success: true,
        error: null,
        errorCode: null,
        errorList: null,
        data: addUser.user
    }
}


// export async function login(loginUserRequest:LoginUserRequest): Promise<LoginUserResponse> {

//     logger.debug(`in login service`);
//     let success=false;
//     let errorList:string[]=[];
//     let loginUserResponse:LoginUserResponse;
//     let errorCode:string|null;
//     let thirdPartySystemModel:ThirdPartySystemAttributes;
//     let accessToken: string;
//     let refreshToken: string;
//     let passwordMatch:boolean = false;
//     let refreshTokenVerified:boolean = false;
//     let verifyTokenResponse:VerifyTokenResponse;
//     const roleList:string[]=[];


//     if(loginUserRequest.userName!=null&&loginUserRequest.userName!=""&&loginUserRequest.password!=null&&loginUserRequest.password!=""){

//         await db.thirdpartysystem.findOne({where: {
//                 userName: loginUserRequest.userName,
//                 enabled: true
//             }}).then(async (tempThirdPartySystemModel:ThirdPartySystemAttributes|null) => {

//             logger.debug(`user found`);
//             if(tempThirdPartySystemModel!=null){
//                 thirdPartySystemModel=tempThirdPartySystemModel;
//             }
//         }).catch((error: Error) => {
//             success=false;
//             logger.error("Error reading user from the database using username:"+error.message);
//             errorList.push("Error reading user from the database using username");
//         });


//         // @ts-ignore
//         if(thirdPartySystemModel!=null){

//             let passwordFields = thirdPartySystemModel.password.split('$');
//             let salt = passwordFields[0];
//             let hash = crypto.createHmac('sha512', salt).update(loginUserRequest.password).digest("base64");
//             if (hash === passwordFields[1]) {
//                 passwordMatch = true;
//             } else {
//                 errorList.push("Password to not match our records");
//             }

//         }
//         else{
//             success=false;
//             errorList.push("No user exist with the provided email address");
//         }

//     }
//     else{

//         if(loginUserRequest.refreshToken!=null){
//             verifyTokenResponse =  await verifyToken(loginUserRequest.refreshToken);

//             if(verifyTokenResponse.success){
//                 refreshTokenVerified=true;

//                 await db.thirdpartysystem.findOne({where: {
//                         id: verifyTokenResponse.data?.thirdPartySystemId,
//                     }}).then(async (tempThirdPartySystemModel:ThirdPartySystemAttributes|null) => {
//                     if(tempThirdPartySystemModel!=null){
//                         thirdPartySystemModel=tempThirdPartySystemModel;
//                     }
//                 }).catch((error: Error) => {
//                     success=false;
//                     logger.error("Error reading user from the database using username:"+error.message);
//                     errorList.push("Error reading user from the database using username");
//                 });

//             }

//         }


//     }



//     if(passwordMatch||refreshTokenVerified){

//         let jwtSecret:string;
//         //TODO sort out this any - Pieter Meyer
//         let secretKey: any;

//         // @ts-ignore
//         jwtSecret=process.env.JWT_SECRET;

//         secretKey = createSecretKey(jwtSecret, 'utf-8');

//         // @ts-ignore
//         accessToken = await new jose.SignJWT({
//             // @ts-ignore
//             userName: thirdPartySystemModel.userName
//         })
//             .setProtectedHeader({ alg: 'HS256' })
//             .setIssuedAt()
//             .setIssuer('backend_admin')
//             .setAudience('FinesMicroservice')
//             // @ts-ignore
//             .setSubject(thirdPartySystemModel.userName)
//             .setExpirationTime('10y')
//             .sign(secretKey);


//         refreshToken  = await new jose.SignJWT({
//             // @ts-ignore
//             thirdPartySystemId:thirdPartySystemModel.id
//         })
//             .setProtectedHeader({ alg: 'HS256' })
//             .setIssuedAt()
//             .setIssuer('backend_admin')
//             .setAudience('FinesMicroservice')
//             // @ts-ignore
//             .setSubject(thirdPartySystemModel.userName)
//             .sign(secretKey);


//         await db.thirdpartysystemrole.findAll({
//             where: {
//                 // @ts-ignore
//                 thirdPartySystemId: thirdPartySystemModel.id,
//             },
//             include: [
//                 {
//                     model: db.thirdpartysystemrolestatus,
//                     required: true,
//                     attributes: [],
//                     where: {
//                         statusCode: "ACTIVE",
//                     },
//                 },
//                 {
//                     model: db.role,
//                     required: true,
//                     attributes: ["authority"],
//                 },
//             ],
//         }).then((thirdPartySystemRoleList:Model[])=>{

//             for (const tempThirdPartySystemRoleIndex in thirdPartySystemRoleList) {
//                 if (tempThirdPartySystemRoleIndex!=null) {
//                     // @ts-ignore
//                     roleList.push(thirdPartySystemRoleList[tempThirdPartySystemRoleIndex].get("role").get("authority"));
//                 }
//             }

//         }).catch((error:Error)=>{
//             logger.error("Error getting third party roles:"+error.message);
//         });


//         success=true;
//     }

//     if (success) {

//         loginUserResponse={
//             success: true,
//             error: null,
//             errorCode: null,
//             errorList:null,
//             data: {
//                 // @ts-ignore
//                 userName: thirdPartySystemModel.userName,
//                 // @ts-ignore
//                 access_token: accessToken,
//                 // @ts-ignore
//                 refresh_token: refreshToken,
//                 roleList: roleList
//             }
//         }

//     } else {


//         loginUserResponse={
//             success: false,
//             error: "There was an error logging you in",
//             // @ts-ignore
//             errorCode: errorCode,
//             errorList:errorList,
//             data: null
//         }

//     }

//     return loginUserResponse;

// }
