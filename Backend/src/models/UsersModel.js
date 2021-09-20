import Sequelize from "sequelize";
import { sequelize } from "../../sql/config.js";
import Task from "./TasksModel.js";

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Task, { foreingKey: "usersId", sourcekey: "id" });
Task.belongsTo(User, { foreingKey: "usersId", sourcekey: "id" });

export default User;