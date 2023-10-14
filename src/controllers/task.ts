import express, {NextFunction, Request, Response} from "express";

const taskController = express.Router();

taskController.post("/addTask",
    async (req: Request, res: Response, next: NextFunction) => {

        return res.status(200).json({
            success: true,
            status: 200,
        });

    });

export = taskController;