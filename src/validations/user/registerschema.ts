import {body} from "express-validator";


    const registerUserValidations = [
        body("userName").not().isEmpty().isLength({min: 2, max: 255}),
        body("password").isStrongPassword({
            minLength:8,
            minLowercase:1,
            minUppercase:1,
            minNumbers: 1,
            minSymbols: 1
        })
    ]

export {registerUserValidations}