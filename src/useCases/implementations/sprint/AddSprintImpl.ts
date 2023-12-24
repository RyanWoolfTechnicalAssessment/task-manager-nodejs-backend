import {IAddSprint} from "../../interfaces/sprint/IAddSprint";
import {IAddSprintRequest} from "../../interfaces/sprint/requestObjects/IAddSprintRequest";
import {ISprintRepository} from "../../../repository/interface/ISprintRepository";
import {SprintAttributes} from "../../../models/sprint";

export class AddSprintImpl implements IAddSprint {
  addSprintRequest: IAddSprintRequest;
  sprintRepository: ISprintRepository;
  // @ts-ignore
  sprint: SprintAttributes|null;
  constructor(
    addSprintRequest: IAddSprintRequest,
    sprintRepository: ISprintRepository,
  ) {
    this.addSprintRequest = addSprintRequest;
    this.sprintRepository = sprintRepository;
  }
  async init(): Promise<void> {
    if (this.addSprintRequest) {
      const sprint = await this.findSprintByNameAndProjectId(
        this.addSprintRequest?.name,this.addSprintRequest?.projectId
      );

      if (sprint != null) {
        this.sprint = sprint;
      } else {
        this.sprint = await this.createSprint();
      }
    }
  }
  async createSprint(): Promise<SprintAttributes | null> {
    console.log(`this.addSprintRequest.name:${this.addSprintRequest.name}`);
    console.log(`this.addSprintRequest.projectId:${this.addSprintRequest.projectId}`);

    return await this.sprintRepository.createSprint(this.addSprintRequest.name,this.addSprintRequest.description,this.addSprintRequest.projectId);
  }

  async findSprintByNameAndProjectId(name: string, projectId:number): Promise<SprintAttributes | null> {
    return await this.sprintRepository.findSprintByNameAndProjectId(name,projectId);
  }

}
