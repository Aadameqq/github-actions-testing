import { ServerError } from "./ServerError";

export class BadRequestServerError extends ServerError {
  getStatusCode(): number {
    return 400;
  }
}
