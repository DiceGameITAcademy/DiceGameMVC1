import express from "express";
import { Express } from "express";
import cors from "cors";
import { setupDatabase } from "../config/databaseSetup"; // Import the database setup function
import { connectToDatabase } from "../server/sequelizeConnection";
import { router } from "./routes/routes";

const app: Express = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log(`This will be a dice game`);

// Initialize and set up the database during application startup
setupDatabase() // This function should create the database and synchronize models
  .then(() => {
    // Connect to the database
    connectToDatabase();
  })
  .catch((error) => {
    console.error("Error setting up the database:", error);
  });

app.use(router);

export default app;


// import express from "express";
// import { Express } from "express";
// import cors from "cors";
// import { setupDatabase } from "../config/databaseSetup"; // Import the database setup function
// import { connectToDatabase } from "../server/sequelizeConnection";
// import { router } from "./routes/routes";

// const createApp = async (): Promise<Express> => {
//   const app: Express = express();

//   app.use(cors({ origin: "*" }));

//   app.use(express.json());
//   app.use(express.urlencoded({ extended: false }));

//   console.log(`this will be a dice game`);

//   // Initialize and set up the database during application startup
//   await setupDatabase(); // This function should create the database and synchronize models

//   // Connect to the database
//   connectToDatabase();

//   app.use(router);

//   return app;
// };

// export default createApp;




// funciona
// import express from "express";
// import { Express } from "express";
// import cors from "cors";
// import { connectToDatabase } from "../server/sequelizeConnection";
// import { router } from "./routes/routes";

// const createApp = (): Express => {
//   const app: Express = express();

//   app.use(cors({ origin: "*" }));

//   app.use(express.json());
//   app.use(express.urlencoded({ extended: false }));

//   console.log(`this will be a dice game`);

//   connectToDatabase();

//   app.use(router);

//   return app;
// };

// export default createApp;

