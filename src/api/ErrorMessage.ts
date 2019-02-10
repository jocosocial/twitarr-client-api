export class ErrorMessage {
  public messages: string[];

  constructor(data: string | string[]) {
    if (data instanceof Array) {
      this.messages = data;
    } else {
      this.messages = [data];
    }
  }

  public toJSON() {
    return this.messages;
  }
}
