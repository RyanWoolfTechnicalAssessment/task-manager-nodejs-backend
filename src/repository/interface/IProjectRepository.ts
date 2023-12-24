import {ProjectAttributes} from "../../models/project";

export interface IProjectRepository {

  findProjectByName(name: string): Promise<ProjectAttributes | null>;

  createProject(name: string, description:string): Promise<ProjectAttributes | null>;

}
