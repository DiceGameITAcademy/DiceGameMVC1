import express from "express";
import { Express } from "express";
import cors from "cors";
import { connectToDatabase } from "../server/sequelizeConnection";
import { router } from "./routes/routes"

const createApp = (): Express => {
  const app: Express = express();

  app.use(cors({ origin: "*" }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  console.log(`this will be a dice game`);

  connectToDatabase();

  app.use(router);


 

  return app;
};

export default createApp;






// import express from "express";
// import { Express } from "express";
// import cors from "cors";
// import { connectToDatabase } from "../server/sequelizeConnection";
// import createPlayerRouter from "./routes/createPlayerPostRouter";

// const createApp = (): Express => {
//   const app: Express = express();

//   app.use(cors({ origin: "*" }));

//   app.use(express.json());
//   app.use(express.urlencoded({ extended: false }));

//   console.log(`this will be a dice game`);

//   connectToDatabase();


//   app.use(createPlayerRouter);

//   return app;
// };

// export default createApp;
