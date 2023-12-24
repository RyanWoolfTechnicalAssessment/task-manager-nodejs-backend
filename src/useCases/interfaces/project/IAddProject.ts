import {ProjectAttributes} from "../../../models/project";
import {IAddProjectRequest} from "./requestObjects/IAddProjectRequest";
import {IProjectRepository} from "../../../repository/interface/IProjectRepository";

export interface IAddProject {
  addProjectRequest: IAddProjectRequest;
  projectRepository: IProjectRepository;
  // @ts-ignore
  project: ProjectAttributes|null;
  init(): Promise<void>;
  findProjectByName(projectName: string): Promise<ProjectAttributes | null>;
  createProject(): Promise<ProjectAttributes | null>;
}
