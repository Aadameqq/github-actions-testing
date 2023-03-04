import express from "express";
import { helloRouter } from "./helloRouter";

const mainRouter = express.Router();

mainRouter.use("/hello", helloRouter);

export { mainRouter };
