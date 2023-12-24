import {ISprintRepository} from "../../../repository/interface/ISprintRepository";
import {IAddSprintRequest} from "./requestObjects/IAddSprintRequest";
import {SprintAttributes} from "../../../models/sprint";

export interface IAddSprint {
  addSprintRequest: IAddSprintRequest;
  sprintRepository: ISprintRepository;
  // @ts-ignore
  sprint: SprintAttributes|null;
  init(): Promise<void>;
  findSprintByNameAndProjectId(sprintName: string,projectId: number): Promise<SprintAttributes | null>;
  createSprint(): Promise<SprintAttributes | null>;
}
