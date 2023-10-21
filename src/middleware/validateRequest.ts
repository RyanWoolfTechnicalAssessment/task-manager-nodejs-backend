import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
const log4js = require("log4js");
let logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

export function validateRequestSchema(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.debug(`in validateRequestSchema`);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errorType: "ValidationError", errors: errors.array() });
  }

  next();
}
