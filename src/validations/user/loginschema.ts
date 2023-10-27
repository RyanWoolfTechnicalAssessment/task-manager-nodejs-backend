import {body, oneOf} from "express-validator";


    const loginValidations = [
        oneOf([
            body("password").notEmpty().isLength({min: 32, max: 255}),
            body("refreshToken").notEmpty().isLength({min: 8, max: 255})
        ]),
        body("userName").not().isEmpty().isLength({min: 5, max: 255})]

export {loginValidations}