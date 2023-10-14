require('dotenv').config();
import createAppServer from "./appsetup";
import http from "http";
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL || 'debug';
const  port = process.env.PORT || 3000;

logger.info('in server');
export const app = createAppServer()

const httpServer = http.createServer(app);

httpServer.listen(port, () => logger.info(`The server is running on port ${port}`));