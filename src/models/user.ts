"use strict";
import { Model } from "sequelize";

export interface UserAttributes {
  id: number;
  userName: string;
  password: string;
  enabled: boolean;
  lastLogin: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class user extends Model<UserAttributes> implements UserAttributes {
    id!: number;
    userName!: string;
    password!: string;
    enabled!: boolean;
    lastLogin!: Date;

    static associate(models: any) {
      // define association here
      models.user.hasMany(models.userrole, {
        foreignKey: "user_id",
      });
    }
  }

  user.init(
    {
      id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "user_name",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "password",
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "enabled",
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "last_login",
      },
    },
    {
      sequelize,
      modelName: "user",
      freezeTableName: true,
      indexes: [
        {
          name: "user_search_fields",
          fields: ["user_name", "enabled"],
        },
      ],
    },
  );
  return user;
};
