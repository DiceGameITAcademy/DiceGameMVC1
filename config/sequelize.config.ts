import { Sequelize } from 'sequelize';

require('dotenv').config();

const sequelize = new Sequelize({
  database: process.env.DB_DATABASE as string,
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  dialect: process.env.DB_DIALECT as 'mysql', 
  host: process.env.DB_HOST as string,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306, 
  logging: console.log as any, 
});

export default sequelize;






// import { Sequelize } from "sequelize-typescript";

// const sequelize = new Sequelize({
//   database: "dicegame",
//   username: "root",
//   password: "password",
//   dialect: "mysql",
//   host: "localhost",
//   port: 3306,
//   logging: console.log,
// });

// export default sequelize;
