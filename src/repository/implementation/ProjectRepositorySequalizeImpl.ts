import db from "../../models/sqlconfig";
import {CustomError} from "../../errorHandling/CustomError";
import {IProjectRepository} from "../interface/IProjectRepository";
import {ProjectAttributes} from "../../models/project";

export class ProjectRepositorySequalizeImpl implements IProjectRepository {
  async findProjectByName(name: string): Promise<ProjectAttributes | null> {
    try {
      return await db.project.findOne({
        where: {
          name: name,
        },
      });
    } catch (err: any) {
      throw new CustomError(
        "An error occurred while finding project by name",
        "DB-PROJ-01",
        err.message,
        false,
      );
    }
  }

  async createProject(name: string, description:string): Promise<ProjectAttributes | null> {
    try {
      return await db.project.create({
          name: name,
          description: description
      });
    } catch (err: any) {
      console.log(err);
      throw new CustomError(
          "An error occurred while creating project",
          "DB-PROJ-02",
          err.message,
          false,
      );
    }
  }
}
