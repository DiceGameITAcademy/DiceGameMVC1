
import sequelize from '../config/sequelize.config'; // Import the sequelize instance directly

// ...

// Create a Sequelize instance with your configuration options
// const sequelize = new Sequelize(sequelizeConfig); // Remove this line

// Define a function to connect to the database
export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
  }
};

export default sequelize; // Export the Sequelize instance for use in models and routes
