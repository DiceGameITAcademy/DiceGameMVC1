// databaseSetup.ts

import sequelize from '../config/sequelize.config'; // Import the sequelize instance
// import Player from './models/playerModelMVC'; // Import your models

export const setupDatabase = async () => {
  try {
    // Check if the database exists. If not, create it.
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS dicegame`);

    // Switch to the newly created database
    await sequelize.query(`USE dicegame`);

    // Sync your models to create tables if they don't exist
    await sequelize.sync();

    // Insert initial data if needed
    // Example: await Player.create({ name: 'John Doe', password: 'myPassword', wins: 0, losses: 0 });
    
    console.log('Database setup completed.');
  } catch (error) {
    console.error('Error setting up the database:', error);
  }
};

// Call the setup function when needed, for example during installation or setup
setupDatabase();