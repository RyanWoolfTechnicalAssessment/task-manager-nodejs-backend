"use strict";
import {
  Model,
} from "sequelize";

export interface UserroleAttributes {
    id: number;
    userId: number;
    roleId: number;
    statusId: number;
}

export interface UserroleInputAttributes {
  userId: number;
  roleId: number;
  statusId: number;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class userrole extends Model<UserroleAttributes>
    implements UserroleAttributes {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    id!: number;
    userId!: number;
    roleId!: number;
    statusId!: number;


    static associate(models: any) {
      // define association here
      models.userrole.belongsTo(models.user, {
        foreignKey: "user_id",
      });

      models.userrole.belongsTo(models.role, {
        foreignKey: "role_id",
      });

      models.userrole.belongsTo(models.userrolestatus, {
        foreignKey: "status_id",
      });
    }
  }


  userrole.init({
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
    roleId: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      field: "role_id",
    },
    statusId: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      field: "status_id",
    },
  }, {
    sequelize,
    modelName: "userrole",
    freezeTableName: true,
    tableName: "userrole"
  });
  return userrole;
};
