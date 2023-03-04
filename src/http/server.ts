import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
// @ts-ignore
import swaggerUI from "swagger-ui-express";
import { decorateWithRouters } from "./routers/decorateWithRouters";
import swaggerDocument from "swagger/swagger.json";
import { prismaClient } from "../database/prismaClient";

dotenv.config();

const PORT = process.env.PORT || 5500;

const app = express();

app.use(morgan("tiny"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const decoratedApp = decorateWithRouters(app);

decoratedApp.listen(PORT, async () => {
  const records = await prismaClient.test.create({ data: { name: "test" } });
  console.log(records);
  console.log(`Listening on port ${PORT}`);
});
