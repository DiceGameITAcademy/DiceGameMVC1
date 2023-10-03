import { Sequelize } from 'sequelize-typescript';
// import { Player } from '../models/player.model'; // Import your Player model

const sequelize = new Sequelize({
  database: 'dicegame',
  username: 'root',
  password: 'password',
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  logging: console.log,
});

// sequelize.addModels([Player]); // Add your Player model to Sequelize

export default sequelize;