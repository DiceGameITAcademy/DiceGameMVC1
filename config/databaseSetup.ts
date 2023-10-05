import sequelize from "../config/sequelize.config";

export const setupDatabase = async () => {
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS dicegame`);

    await sequelize.query(`USE dicegame`);

    await sequelize.sync();

    console.log("Database setup completed.");
  } catch (error) {
    console.error("Error setting up the database:", error);
  }
};

setupDatabase();
