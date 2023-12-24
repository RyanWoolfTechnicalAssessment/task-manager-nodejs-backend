export interface IAddTaskRequest {
  userId: number;
  projectId: number;
  sprintId: number;
  description: string;
}
