/**
 * Represents a Twitarr error.
 * @module TwitarrError
 */
export class TwitarrError extends Error {
  /**
   * The response status code, if any.
   * @hidden
   */
  private statusCode: number;

  /**
   * The options provided as part of the request that resulted in this error.
   */
  private options: any;

  /**
   * Any error messages that were returned from Twit-arr.
   */
  private errors: { [key: string]: string } = { };

  /**
   * Any other useful data.
   */
  private data: any;

  /** The error code associated with this error. */
  public get code() {
    return this.statusCode;
  }

  /**
   * Create a new error.
   * @constructor
   * @param message - The error message.
   * @param code - An optional error code to associate with the error.
   */
  // tslint:disable-next-line
  constructor(message?: string, code?: number, errors?: string[] | { [key: string]: string }, options?: any, data?: any) {
      super(message);
      const self = this;
      self.name = self.constructor.name;
      self.statusCode = code;
      if (errors && errors instanceof Array) {
        errors.forEach((err, index) => self.errors[''+index] = err[index]);
      }
      self.options = options;
      self.data = data;

       // tslint:disable-next-line
      if (typeof Error.captureStackTrace === 'function') {
          Error.captureStackTrace(this, this.constructor);
      } else {
          this.stack = (new Error(message)).stack;
      }
      // workaround, see http://bit.ly/2vllGdD
      Object.setPrototypeOf(this, TwitarrError.prototype);
  }

  /**
   * Returns a string representation of this error.
   */
  public toString() {
    if (this.code) {
      return 'Error ' + this.code + ': ' + this.message;
    } else {
      return 'Error: ' + this.message;
    }
  }
}
