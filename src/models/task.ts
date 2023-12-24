"use strict";
import { Model } from "sequelize";

export interface TaskAttributes {
  id: number;
  userId: number;
  description: string;
}

export interface TaskInputAttributes {
  userId: number;
  description: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class task extends Model<TaskAttributes> implements TaskAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    userId!: number;
    description!: string;

    static associate(models: any) {
      models.task.belongsTo(models.user, {
        foreignKey: "user_id",
      });
    }
  }

  task.init(
    {
      id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        field: "user_id",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "description",
      },
    },
    {
      sequelize,
      modelName: "task",
      freezeTableName: true,
      indexes: [
        {
          name: "task_description",
          fields: ["description"],
        },
      ],
    },
  );
  return task;
};
