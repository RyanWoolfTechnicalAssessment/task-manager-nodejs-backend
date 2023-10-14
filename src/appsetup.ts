import express from "express";
// @ts-ignore
import cors from 'cors';
import taskController from "./controllers/task";
function createAppServer() {
    const app = express();
    app.use(express.json());
    app.use(cors({origin: true}));

    app.use('/task', taskController);
    return app;
}

export default createAppServer;