import log4js from "log4js";
const logger = log4js.getLogger();
// @ts-ignore
logger.level = process.env.LOG_LEVEL;

async function sendSupportEmail(errorMessage:string,errorCode:string,originalError:string) {

   logger.debug(`todo implement email sending`)
}

export default sendSupportEmail;