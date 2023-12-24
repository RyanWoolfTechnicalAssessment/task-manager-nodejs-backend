import {IAddProject} from "../../interfaces/project/IAddProject";
import {IAddProjectRequest} from "../../interfaces/project/requestObjects/IAddProjectRequest";
import {ProjectAttributes} from "../../../models/project";
import { IProjectRepository } from "../../../repository/interface/IProjectRepository";

export class AddProjectImpl implements IAddProject {
  addProjectRequest: IAddProjectRequest;
  projectRepository: IProjectRepository;
  // @ts-ignore
  project: ProjectAttributes|null;
  constructor(
    addProjectRequest: IAddProjectRequest,
    projectRepository: IProjectRepository,
  ) {
    this.addProjectRequest = addProjectRequest;
    this.projectRepository = projectRepository;
  }
  async init(): Promise<void> {
    if (this.addProjectRequest) {
      const project = await this.findProjectByName(
        this.addProjectRequest?.name,
      );

      if (project != null) {
        this.project = project;
      } else {
        this.project = await this.createProject();
      }
    }
  }
  async createProject(): Promise<ProjectAttributes | null> {
    console.log(`this.addProjectRequest.name:${this.addProjectRequest.name}`);
    console.log(`this.addProjectRequest.description:${this.addProjectRequest.description}`);

    return await this.projectRepository.createProject(this.addProjectRequest.name,this.addProjectRequest.description);
  }

  async findProjectByName(name: string): Promise<ProjectAttributes | null> {
    return await this.projectRepository.findProjectByName(name);
  }

}
