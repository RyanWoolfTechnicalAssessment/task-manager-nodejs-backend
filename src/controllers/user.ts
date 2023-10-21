import express, {NextFunction, Request, Response} from "express";
const log4js = require("log4js");
let logger = log4js.getLogger();

import {RegisterUserRequest,RegisterUserResponse,User} from "../definitions/user/userdefinitions"
logger.level = process.env.LOG_LEVEL;
const userController = express.Router();
import {body, validationResult} from "express-validator";
import { validateRequestSchema } from "../middleware/validateRequest";
import {registerUserValidations} from "../validations/user/registerschema";
const userService = require("../services/userservice");


// userController.post("/login",
//     //TODO Figure out why I cannot declare a type - Pieter Meyer
//     // @ts-ignore
//     loginValidations,
//     validateRequestSchema,
//     async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         logger.debug("in /user/login/");

//         const errors = validationResult(req);
//         let loginUserResponse: LoginUserResponse;

//         const loginUserRequest: LoginUserRequest = {
//             userName: req.body.userName,
//             password: req.body.password,
//             refreshToken: req.body.refreshToken
//         };

//         logger.debug(`just about to go into userservice -> login`)
//         loginUserResponse = await userService.login(loginUserRequest);

//         if (loginUserResponse.success) {
//             return res.status(200).json({
//                 data: loginUserResponse.data,
//                 success: true,
//                 status: 200,
//             });
//         } else {
//             return res.status(401).json({
//                 data: {
//                     error: loginUserResponse.error,
//                     errorCode: loginUserResponse.errorCode,
//                     errorList: loginUserResponse.errorList,
//                 },
//                 success: false,
//                 status: 401,
//             });
//         }
//     } catch (error) {
//         logger.error("login error: ", error);
//         next(error);
//     }


//     }
// );

userController.post("/register",
    registerUserValidations,
    validateRequestSchema,
    async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.debug("in /user/registerThirdPartySystem/");

        const errors = validationResult(req);
        let registerUserResponse:RegisterUserResponse;

        if (!errors.isEmpty()) {
            return res.status(400).json({errorType: 'ValidationError', errors: errors.array()});
        }

        const registerUserRequest:RegisterUserRequest={
            userName: req.body.userName,
            password: req.body.password
        };

        logger.debug(`req.body.userRoles:${req.body.userRoles}`);

        registerUserResponse= await userService.registerUser(registerUserRequest,["ROLE_CLIENT"]);

        if(registerUserResponse.success){
            return res.status(200).json({
                data: registerUserResponse.data,
                success: true,
                status: 200,
            });
        }
        else{
            return res.status(400).json({
                data: {
                    error: registerUserResponse.error,
                    errorCode: registerUserResponse.errorCode,
                    errorList: registerUserResponse.errorList,
                },
                success: false,
                status: 400,
            });
        }
    } catch (error) {
    logger.error("registerThirdPartySystem error: ", error);
    next(error);
}

    }
);


export = userController;