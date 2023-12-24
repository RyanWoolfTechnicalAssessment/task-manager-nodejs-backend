import db from "../../models/sqlconfig";
import {CustomError} from "../../errorHandling/CustomError";
import {ITaskRepository} from "../interface/ITaskRepository";
import {TaskAttributes} from "../../models/task";

export class TaskRepositorySequalizeImpl implements ITaskRepository {

  async createTask(userId: number, projectId:number, sprintId: number, description:string): Promise<TaskAttributes | null> {
    try {
      return await db.task.create({
          userId: userId,
          projectId: projectId,
          sprintId: sprintId,
          description: description
      });
    } catch (err: any) {
      console.log(err);
      throw new CustomError(
          "An error occurred while creating task",
          "DB-TASK-01",
          err.message,
          false,
      );
    }
  }
}
