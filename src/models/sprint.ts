"use strict";
import { Model } from "sequelize";

export interface SprintAttributes {
  id: number;
  projectId: number;
  name: string;
  description: string;
}

export interface SprintInputAttributes {
  projectId: number;
  name: string;
  description: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class sprint extends Model<SprintAttributes> implements SprintAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    projectId!: number;
    name!: string;
    description!: string;

    static associate(models: any) {
      models.sprint.belongsTo(models.project, {
        foreignKey: "project_id",
      });
    }
  }

  sprint.init(
    {
      id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      projectId:{
        type: DataTypes.BIGINT(20),
        allowNull: false,
        field: "project_id"
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
      modelName: "sprint",
      freezeTableName: true,
      indexes: [
        {
          name: "sprint_name",
          fields: ["name"],
        },
      ],
    },
  );
  return sprint;
};
