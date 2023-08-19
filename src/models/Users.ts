import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize-db";
import { UserModel } from "./../types/User";
// https://sequelize.org/api/v6/class/src/model.js~model

const Users = sequelize.define<UserModel>(
  "users",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
   
   username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

  },
  {
    timestamps: true,
    underscored:true
  }
);

export { Users };
