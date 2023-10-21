require("dotenv").config();
import db from "./models/sqlconfig";
import createAppServer from "./appsetup";
import http from "http";
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL || "debug";
const port = process.env.PORT || 3000;
const databaseservice = require("./services/databaseservice");

logger.info("in server");
export const app = createAppServer();

const httpServer = http.createServer(app);

db.sequelize
  .sync()
  .then(async () => {
    await databaseservice.populateDatabase();
    logger.debug(`connected to sequalize db`);
    httpServer.listen(port, () =>
      logger.info(`The server is running on port ${port}`),
    );
  })
  .catch((error: Error) => {
    logger.error("DB Sync Error:" + error.message, error);
  });
