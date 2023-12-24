import {SprintAttributes} from "../../models/sprint";

export interface ISprintRepository {

  findSprintByNameAndProjectId(name: string, projectId:number): Promise<SprintAttributes | null>;

  createSprint(name: string, description:string,projectId: number): Promise<SprintAttributes | null>;

}
