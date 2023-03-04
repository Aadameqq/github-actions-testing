import { Body, Controller, Post, Route, Response } from "tsoa";
import { InternalServerError } from "../../errors/InternalServerError";
@Route("/hello")
export class HelloController extends Controller {
  @Post()
  @Response(201, "Success")
  create(@Body() nickname: string) {
    if (nickname === "test") throw new InternalServerError("Error");
    return `Hello ${nickname}`;
  }
}
