import sequelize from "../config/sequelize.config";
export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL database");
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
  }
};

export default sequelize;
