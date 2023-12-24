import express, { NextFunction, Request, Response } from "express";
import {CreateTaskResponse} from "../interfaces/task/task";
import {addTask} from "../services/taskservice";
import {TaskInputAttributes} from "../models/task";

const taskController = express.Router();

taskController.post(
  "/addTask",
  async (req: Request, res: Response, next: NextFunction) => {

    const request: TaskInputAttributes = {
        userId: req.body.userId,//this should come from the token
        projectId: req.body.projectId,
        sprintId: req.body.sprintId,
        description: req.body.description
    }

    const response:CreateTaskResponse = await addTask(request);

    return res.status(200).json({
      success: true,
      status: 200,
      data: response.data
    });
  },
);

export = taskController;
