export class InfrasonicError extends Error {
    errorCode:string;
    constructor(message: string, errorCode:string) {
        super(message);
        this.errorCode = errorCode;
    }
}

// TODO: Add Error code list
//
// DB Error Codes
// DB-001-1 is find fine by notice number call to the DB failed, there was an error while getting the discount type
// DB-002-1 is find client by identification type and identification number call to the DB failed, error occurred while finding client
// DB-003-1 is find thirdpartyclient by third party system id and third party id call to the DB failed, error occurred while finding client
