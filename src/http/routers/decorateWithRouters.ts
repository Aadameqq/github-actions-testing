import express, { Application } from "express";
import { mainRouter } from "./mainRouter";

export const decorateWithRouters = (app: Application): Application => {
  app.use(express.json());
  app.use("/api", mainRouter);
  return app;
};
