import Sequelize from "sequelize";
import { sequelize } from "../../sql/config.js";
import User from "./UsersModel.js";

const Task = sequelize.define(
  "tasks",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    deadline: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    delivery: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    completed: {
      type: Sequelize.BOOLEAN,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

export default Task;
