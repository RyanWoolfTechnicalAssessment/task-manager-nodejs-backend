"use strict";
import {
  Model,
} from "sequelize";

export interface RoleAttributes {
    id: number;
    authority: string;
    displayName: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class role extends Model<RoleAttributes>
    implements RoleAttributes {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    id!: number;
    authority!: string;
    displayName!: string;


    static associate(models: any) {
      // define association here
      models.role.hasOne(models.userrole, {
        foreignKey: "role_id",
      });
    }
  }

  role.init({
    id: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    authority: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "authority",
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "display_name",
    },
  }, {
    sequelize,
    modelName: "role",
    freezeTableName: true,
    indexes:[
      {
        name: 'role_authority_field',
        fields: ['authority'],
      }
    ]
  });
  return role;
};
