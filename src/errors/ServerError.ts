export abstract class ServerError extends Error {
  protected constructor(msg: string) {
    super(msg);
  }
  public getMessage() {
    return this.message;
  }
  public abstract getStatusCode(): number;
}
