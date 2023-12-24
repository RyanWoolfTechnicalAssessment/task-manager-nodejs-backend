import {IAddSprint} from "../../interfaces/sprint/IAddSprint";
import {IAddSprintRequest} from "../../interfaces/sprint/requestObjects/IAddSprintRequest";
import {ISprintRepository} from "../../../repository/interface/ISprintRepository";
import {SprintAttributes} from "../../../models/sprint";
import {IAddTask} from "../../interfaces/task/IAddTask";
import {IAddTaskRequest} from "../../interfaces/task/requestObjects/IAddTaskRequest";
import {ITaskRepository} from "../../../repository/interface/ITaskRepository";
import {TaskAttributes} from "../../../models/task";

export class AddTaskImpl implements IAddTask {
  addTaskRequest: IAddTaskRequest;
  taskRepository: ITaskRepository;
  // @ts-ignore
  task: TaskAttributes|null;
  constructor(
    addTaskRequest: IAddTaskRequest,
    taskRepository: ITaskRepository,
  ) {
    this.addTaskRequest = addTaskRequest;
    this.taskRepository = taskRepository;
  }
  async init(): Promise<void> {
    if (this.addTaskRequest) {
      this.task = await this.createTask();
    }
  }
  async createTask(): Promise<TaskAttributes | null> {
    console.log(`this.addTaskRequest.userId:${this.addTaskRequest.userId}`);
    console.log(`this.addTaskRequest.projectId:${this.addTaskRequest.projectId}`);
    console.log(`this.addTaskRequest.sprintId:${this.addTaskRequest.sprintId}`);
    console.log(`this.addTaskRequest.description:${this.addTaskRequest.description}`);

    return await this.taskRepository.createTask(this.addTaskRequest.userId,this.addTaskRequest.projectId,this.addTaskRequest.sprintId,this.addTaskRequest.description);
  }
}
