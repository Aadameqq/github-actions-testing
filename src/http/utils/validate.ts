import { Schema } from "joi";
import { NextFunction, Request, Response } from "express";

export const validate =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { error: errors } = await schema
      .options({ allowUnknown: true, abortEarly: false })
      .validate(req);

    if (!errors) return next();

    const formattedErrors = {
      errors: errors.details.map(({ message }) => ({ errorMessage: message })),
    };
    res.status(400).json(formattedErrors);
  };
