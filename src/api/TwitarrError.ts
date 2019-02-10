import { ErrorMessage } from './ErrorMessage';
import { IErrorParameters } from './IErrorParameters';

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
  private errors: ErrorMessage | IErrorParameters;

  /**
   * Any other useful data.
   */
  private data: any;

  /** The error code associated with this error. */
  public get code() {
    return this.statusCode;
  }

  /** The error message */
  public get simpleErrorMessage() {
    if (this.message) {
      return this.message;
    }
    if (this.errors instanceof ErrorMessage && this.errors.messages.length > 0) {
      return this.errors.messages[0];
    } else if (this.errors && Object.keys(this.errors).length > 0) {
      const key = Object.keys(this.errors)[0];
      return this.errors[key][0];
    }
    return undefined;
  }
  /**
   * Create a new error.
   * @constructor
   * @param message - The error message.
   * @param code - An optional error code to associate with the error.
   */
  // tslint:disable-next-line
  constructor(message?: string, code?: number, errors?: any, options?: any, data?: any) {
      super(message);
      const self = this;
      self.name = self.constructor.name;
      self.statusCode = code;
      self.options = options;
      self.data = data;

      if (typeof errors === 'string' || errors instanceof String) {
        self.errors = new ErrorMessage(errors as string);
      } else if (Array.isArray(errors)) {
        self.errors = new ErrorMessage(errors as string[]);
      } else if (errors && Object.keys(errors).length > 0) {
        self.errors = errors as IErrorParameters;
      } else if (errors) {
        console.warn('Unsure how to decode error response:', errors);
      }

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
    let message = this.message;
    if (this.errors) {
      let stringified = JSON.stringify(this.errors);
      stringified = stringified.replace(/\\"/g, '\uFFFF');
      stringified = stringified.replace(/\"([^"]+)\"/g, '$1').replace(/\uFFFF/g, '\\"');
      message = (message? message + ': ' : '') + stringified;
    }
    if (this.code) {
      return 'Error ' + this.code + ': ' + message;
    } else {
      return 'Error: ' + message;
    }
  }
}
