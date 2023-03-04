import { ServerError } from "./ServerError";

export class InternalServerError extends ServerError {
  private static defaultMessage =
    "The server encountered an unexpected condition that prevented it from fulfilling the request. Try again later";
  constructor(msg?: string) {
    super(msg || InternalServerError.defaultMessage);
  }
  getStatusCode(): number {
    return 500;
  }
}
