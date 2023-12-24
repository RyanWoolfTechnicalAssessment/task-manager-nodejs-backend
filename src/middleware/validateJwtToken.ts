import { Request, Response } from "express";
import { verifyToken } from "../services/userservice";
import db from "../models/sqlconfig";
import { Model } from "sequelize";
import { VerifyTokenResponse } from "../interfaces/user/user";
import { UserAttributes } from "../models/user";

const log4js = require("log4js");
let logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

const validateJwtTokenUser = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  let userModel: UserAttributes | null;
  let path: string;
  let verifyTokenResponse: VerifyTokenResponse;
  let endpointKeyList: string[];

  const unsecuredPathList: string[] = [
    "/user/login",
    "/user/testSingletonBehaviour",
      "/task/addTask"
  ];
  const endpointRoleMap = new Map<string, string[]>([
    ["/user/registerUser", ["ROLE_ADMIN"]],
  ]);

  logger.debug(`endpointRoleMap:${JSON.stringify(endpointRoleMap)}`);

  path = req.path;

  logger.debug("path before:" + path);

  for (const tempIndex in unsecuredPathList) {
    if (unsecuredPathList[tempIndex].includes("**")) {
      const tempCheckPath = unsecuredPathList[tempIndex].replace("**", "");
      if (path.includes(tempCheckPath)) {
        path = unsecuredPathList[tempIndex];
      }
    }
  }

  endpointKeyList = Array.from(endpointRoleMap.keys());

  for (const tempIndex in endpointKeyList) {
    if (endpointKeyList[tempIndex].includes("**")) {
      const tempCheckPath = endpointKeyList[tempIndex].replace("**", "");
      if (path.includes(tempCheckPath)) {
        path = endpointKeyList[tempIndex];
      }
    }
  }

  logger.debug("path after:" + path);

  if (unsecuredPathList.includes(path)) {
    next();
    return;
  }

  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)
  ) {
    logger.error(
      "No token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Token>",
      'or by passing a "__session" cookie.',
    );
    res
      .status(401)
      .json({ success: false, status: 401, error: "Unauthorized" });
    return;
  }

  let idToken: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    logger.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    logger.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res
      .status(403)
      .json({ success: false, status: 403, error: "Unauthorized" });
    return;
  }

  try {
    verifyTokenResponse = await verifyToken(idToken);

    if (verifyTokenResponse.success) {
      logger.log(
        "ID Token correctly decoded",
        verifyTokenResponse.data?.userName,
      );

      await db.user
        .findOne({
          where: {
            userName: verifyTokenResponse.data?.userName,
          },
        })
        .then(async (tempUserAttributes: UserAttributes | null) => {
          userModel = tempUserAttributes;

          if (userModel != null) {
            if (userModel.enabled) {
              await db.userrole
                .findAll({
                  where: {
                    userId: userModel.id,
                  },
                  include: [
                    {
                      model: db.userrolestatus,
                      required: true,
                      attributes: [],
                      where: {
                        statusCode: "ACTIVE",
                      },
                    },
                    {
                      model: db.role,
                      required: true,
                      attributes: ["authority"],
                    },
                  ],
                })
                .then((userRoleList: Model[]) => {
                  console.log("1");
                  const roleList: string[] = [];
                  let rolePermitted = false;
                  console.log("2");
                  for (const tempUserRoleIndex in userRoleList) {
                    console.log("3");
                    if (tempUserRoleIndex != null) {
                      console.log("4");
                      // @ts-ignore
                      roleList.push(
                        userRoleList[tempUserRoleIndex]
                          .get("role")
                          .get("authority"),
                      );
                    }
                  }

                  req.body.userModel = userModel;
                  req.body.roleList = roleList;
                  console.log("5");
                  if (roleList.length > 0) {
                    for (const tempRole in roleList) {
                      console.log("6");

                      // @ts-ignore
                      if (
                        endpointRoleMap.get(path).includes(roleList[tempRole])
                      ) {
                        console.log("7");
                        rolePermitted = true;
                        next();
                        return;
                      }
                    }
                    if (!rolePermitted) {
                      logger.error(
                        "Roles Assign to third party not permitted to access endpoint",
                      );
                      res.status(401).json({
                        success: false,
                        status: 401,
                        error: "Unauthorized",
                      });
                    }
                  } else {
                    logger.error(
                      "Error third party does not have roles assigned",
                    );
                    res.status(401).json({
                      success: false,
                      status: 401,
                      error: "Unauthorized",
                    });
                  }
                })
                .catch((error: Error) => {
                  logger.error("Error getting member roles:" + error.message);
                  res.status(500).json({
                    success: false,
                    status: 403,
                    error: "Error getting third party roles",
                  });
                });
            } else {
              logger.error("Error third party user is not enabled");
              res
                .status(403)
                .json({ success: false, status: 403, error: "Forbidden" });
            }
          } else {
            logger.error("Error Auth Third Party in local database");
            res
              .status(401)
              .json({ success: false, status: 401, error: "Unauthorized" });
          }
          return;
        })
        .catch((error: Error) => {
          logger.error(
            "Error Auth Third Party in local database:" + error.message,
          );
          res
            .status(401)
            .json({ success: false, status: 401, error: "Unauthorized" });
          return;
        });
    } else {
      logger.error("Error Verifying token:" + verifyTokenResponse.error);
      res
        .status(401)
        .json({ success: false, status: 401, error: "Unauthorized" });
      return;
    }
  } catch (error) {
    logger.error("Error while verifying token:", error);
    res.status(500).json({
      success: false,
      status: 500,
      error: "Internal Server error while verifying token",
    });
    return;
  }
};

export default validateJwtTokenUser;
