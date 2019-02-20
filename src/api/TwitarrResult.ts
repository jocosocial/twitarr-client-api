import { TwitarrError } from './TwitarrError';

/**
 * An [[ITwitarrHTTP]] query result.
 * @module TwitarrResult
 */
export class TwitarrResult<T> {
  /** Create a new success result. */
  public static ok(response: any, message?: string, code?: number, type?: string) {
    return new TwitarrResult(response, message, code || 200, type);
  }

  /** Create a new "No Content" result. */
  public static noContent() {
    // Use a null string for the data
    return new TwitarrResult(null, 'No Content', 204);
  }

  /** The data, if any. */
  public data: T;

  /** The request type, if any. */
  public type: string;

  /** The status message associated with this result. */
  public message: string;

  /** The response code associated with this result. */
  public code: number;

  /** The error associated with this response if any. */
  public error: TwitarrError;

  /**
   * Construct a new result.
   * @param data The payload of the response.
   * @param message The status message associated with the result.
   * @param code The response code of the response.
   * @param type The request type of the response.
   */
  public constructor(data: T, message?: string, code?: number, type?: string) {
    this.message = message;
    this.code = code;
    this.type = type;

    this.data = data;
    const errors = this.data && (this.data as any).errors ? (this.data as any).errors : undefined;
    const status = this.data && (this.data as any).status ? (this.data as any).status : undefined;

    if (!message && this.data && (this.data as any).message) {
      this.message = (this.data as any).message;
    }

    if (!this.isSuccess() || errors || status === 'error') {
      this.error = new TwitarrError(message, code, errors, undefined, data);
    }
  }

  /** Whether this result is considered successful. */
  public isSuccess() {
    return this.code === 200 || this.code === 202 || this.code === 204;
  }
}
