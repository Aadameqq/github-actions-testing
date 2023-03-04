import j from "joi";
import express from "express";
import { validate } from "../utils/validate";
import { catchErrors } from "../utils/catchErrors";
import { HelloController } from "../../features/hello/HelloController";

const helloRouter = express.Router();

const createHelloRouterValidation = j.object({
  body: j.object({ nickname: j.string().min(3).max(10).required() }),
});
helloRouter.post(
  "/",
  validate(createHelloRouterValidation),
  catchErrors((req, res) => {
    const response = new HelloController().create(req.body.nickname);
    res.status(201).json(response);
  })
);

export { helloRouter };
