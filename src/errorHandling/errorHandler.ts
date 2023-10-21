import { Request, Response } from "express";
import { InfrasonicError } from "./infrasonicError";
import { ErrorResponseHandler } from "./errorResponseHandler";
import sendSupportEmail from "./sendSupportEmail";
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;
export const errorHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: () => void,
) => {
  if (error instanceof ErrorResponseHandler) {
    if (error.sendSupportMail) {
      await sendSupportEmail(
        error.message,
        error.errorCode,
        error.originalError,
      );
    }

    return res.status(500).json({
      data: {
        error: error.message,
        errorCode: error.errorCode,
        // @ts-ignore
        errorList: [error.message],
      },
      success: false,
      status: 500,
    });
  } else {
    return res.status(500).json({
      data: {
        error: error.message,
        errorCode: null,
        // @ts-ignore
        errorList: [error.toString()],
      },
      success: false,
      status: 500,
    });
  }
};
