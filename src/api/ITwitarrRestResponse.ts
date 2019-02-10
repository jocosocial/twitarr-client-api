/**
 * Interface for a Twit-arr response.
 *
 * @interface
 * @module ITwitarrRestResponse
 */
export interface ITwitarrRestResponse {
  /** The response status. */
  status: 'ok' | 'error' | undefined;

  /** An error message. */
  error: string;

  /** A list of error messages. */
  errors: string[] | { [parameter: string]: string | string[] };
}
