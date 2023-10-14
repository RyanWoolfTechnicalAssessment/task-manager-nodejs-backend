"use strict";
import {
  Model,
} from "sequelize";

export interface UserrolestatusAttributes {
    id: number;
    statusCode: string;
    statusName: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class userrolestatus extends Model<UserrolestatusAttributes>
    implements UserrolestatusAttributes {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    id!: number;
    statusCode!: string;
    statusName!: string;

    static associate(models: any) {
      // define association here
      models.userrolestatus.hasOne(models.userrole, {
        foreignKey: "status_id",
      });
    }
  }

  userrolestatus.init({
    id: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    statusCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "status_code",
    },
    statusName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "status_name",
    }
  }, {
    sequelize,
    modelName: "userrolestatus",
    freezeTableName: true,
    tableName: "userrolestatus",
    indexes:[
    {
      name: 'user_statuscode_search',
      fields: ['status_code'],
    }
  ]
  });
  return userrolestatus;
};
