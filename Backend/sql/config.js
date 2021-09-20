import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const DATABASE = process.env.DATABASE;
export const USER_DB = process.env.USER_DB;
export const PASSWORD = process.env.PASSWORD;
export const IP_SERVER = process.env.IP_SERVER;
export const PORT = process.env.PORT;
export const API_VERSION = "v1";
export const SECRET_KEY = process.env.SECRET_KEY;

export const sequelize = new Sequelize(DATABASE, USER_DB, PASSWORD, {
  host: IP_SERVER,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
  logging: false,
  timezone: "Mexico/General",
});
