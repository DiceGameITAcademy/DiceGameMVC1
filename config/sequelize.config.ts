import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: "dicegame",
  username: "root",
  password: "password",
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  logging: console.log,
});

export default sequelize;
