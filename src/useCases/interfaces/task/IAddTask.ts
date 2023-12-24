
import {IAddTaskRequest} from "./requestObjects/IAddTaskRequest";
import {TaskAttributes} from "../../../models/task";
import {ITaskRepository} from "../../../repository/interface/ITaskRepository";

export interface IAddTask {
  addTaskRequest: IAddTaskRequest;
  taskRepository: ITaskRepository;
  // @ts-ignore
  task: TaskAttributes|null;
  init(): Promise<void>;
  createTask(): Promise<TaskAttributes | null>;
}
