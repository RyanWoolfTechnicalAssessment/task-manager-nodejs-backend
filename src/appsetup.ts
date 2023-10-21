import express from "express";
// @ts-ignore
import cors from 'cors';
import taskController from "./controllers/task";
import userController from "./controllers/user";
function createAppServer() {
    const app = express();
    app.use(express.json());
    app.use(cors({origin: true}));

    app.use('/task', taskController);
    app.use('/user', userController);
    return app;
}

export default createAppServer;