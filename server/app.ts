import express from "express";
import { Express } from "express";
import cors from "cors";
import { setupDatabase } from "../config/databaseSetup";
import { connectToDatabase } from "../server/sequelizeConnection";
import { router } from "./routes/routes";

const app: Express = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log(`This will be a dice game`);

app.use(express.static("public"));

setupDatabase()
  .then(() => {
    connectToDatabase();
  })
  .catch((error) => {
    console.error("Error setting up the database:", error);
  });

app.use(router);

export default app;
