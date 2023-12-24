"use strict";
import { Model } from "sequelize";

export interface ProjectAttributes {
  id: number;
  name: string;
  description: string;
}

export interface ProjectInputAttributes {
  name: string;
  description: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class project extends Model<ProjectAttributes> implements ProjectAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    description!: string;

    static associate(models: any) {
      models.project.hasMany(models.task, {
        foreignKey: "project_id",
      });

      models.project.hasMany(models.sprint, {
        foreignKey: "project_id",
      });
    }
  }

  project.init(
    {
      id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "name",
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        field: "description",
      },
    },
    {
      sequelize,
      modelName: "project",
      freezeTableName: true,
      indexes: [
        {
          name: "project_name",
          fields: ["name"],
        },
      ],
    },
  );
  return project;
};
