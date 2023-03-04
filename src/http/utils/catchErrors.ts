import { NextFunction, Request, Response } from "express";
import { InternalServerError } from "../../errors/InternalServerError";
import { ServerError } from "../../errors/ServerError";
const defaultError = new InternalServerError();
export const catchErrors =
  (callback: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      callback(req, res, next);
    } catch (err) {
      console.log(err);
      if (err instanceof ServerError) {
        return respondWithServerError(res, err);
      }
      respondWithServerError(res, defaultError);
    }
  };

const respondWithServerError = (res: Response, err: ServerError) => {
  res.status(err.getStatusCode()).json({ errorMessage: err.getMessage() });
};
