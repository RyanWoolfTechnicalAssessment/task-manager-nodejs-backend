import {TaskAttributes} from "../../models/task";

export interface ITaskRepository {

  createTask(userId: number, projectId:number,sprintId: number, description: string): Promise<TaskAttributes | null>;

}
