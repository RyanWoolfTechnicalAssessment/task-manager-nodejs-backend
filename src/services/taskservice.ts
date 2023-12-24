
import {
  VerifyTokenResponse,
} from "../interfaces/user/user";
const log4js = require("log4js");
import {TaskAttributes, TaskInputAttributes} from "../models/task";
import {CreateTaskResponse} from "../interfaces/task/task";
import {IAddTask} from "../useCases/interfaces/task/IAddTask";
import {TaskRepositorySequalizeImpl} from "../repository/implementation/TaskRepositorySequalizeImpl";
import {AddTaskImpl} from "../useCases/implementations/task/AddTaskImpl";
import {ITaskRepository} from "../repository/interface/ITaskRepository";

let logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

export async function addTask(
  task: TaskInputAttributes,
): Promise<CreateTaskResponse> {

  const taskRepository: ITaskRepository = new TaskRepositorySequalizeImpl();
  const addTask:IAddTask = new AddTaskImpl(task,taskRepository);
  await addTask.init();

  return {
    success: true,
    error: null,
    errorCode: null,
    errorList: null,
    data: addTask.task
  };
}
