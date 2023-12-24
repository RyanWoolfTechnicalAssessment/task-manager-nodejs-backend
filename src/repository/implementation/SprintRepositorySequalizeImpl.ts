import db from "../../models/sqlconfig";
import {CustomError} from "../../errorHandling/CustomError";
import {IProjectRepository} from "../interface/IProjectRepository";
import {ProjectAttributes} from "../../models/project";
import {ISprintRepository} from "../interface/ISprintRepository";
import {SprintAttributes} from "../../models/sprint";

export class SprintRepositorySequalizeImpl implements ISprintRepository {
  async findSprintByNameAndProjectId(name: string,projectId:number): Promise<SprintAttributes | null> {
    try {
      return await db.sprint.findOne({
        where: {
          name: name,
          projectId:projectId
        },
      });
    } catch (err: any) {
      throw new CustomError(
        "An error occurred while finding sprint by name and projectId",
        "DB-SPRINT-01",
        err.message,
        false,
      );
    }
  }

  async createSprint(name: string, description:string, projectId: number): Promise<SprintAttributes | null> {
    try {
      return await db.sprint.create({
          name: name,
          description: description,
          projectId: projectId
      });
    } catch (err: any) {
      console.log(err);
      throw new CustomError(
          "An error occurred while creating sprint",
          "DB-SPRINT-02",
          err.message,
          false,
      );
    }
  }
}
