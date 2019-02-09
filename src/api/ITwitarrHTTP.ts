/** @hidden */
declare const Promise;

import { TwitarrHTTPOptions } from './TwitarrHTTPOptions';
import { TwitarrResult } from './TwitarrResult';
import { TwitarrServer } from './TwitarrServer';

/**
 * Interface for making ReST calls to an HTTP server.
 * @interface
 * @module ITwitarrHTTP
 *
 * Notes to implementors:
 * - Implementations of this interface MUST have a constructor that allows an empty
 *   constructor to be passed (although it is OK to take optional arguments for
 *   the purposes of unit testing).
 * - Implementations MUST always use the current state of the 'server' config property
 *   when creating requests.  If the 'server' property changes, the implementation
 *   should do whatever is necessary to reconfigure itself.
 * - Implementations SHOULD prefer the auth in the TwitarrServer (if available)
 *   over the one in the TWitarrHTTPOptions, but should fall back if no auth
 *   configuration is supplied in the server property.
 */
export interface ITwitarrHTTP {
  /** The server associated with this instance. */
  server: TwitarrServer;

  /** The default options used when making requests with this instance. */
  options: TwitarrHTTPOptions;

  /** The username for ReST APIv2 calls. */
  getUsername(): string;
  setUsername(username: string): ITwitarrHTTP;

  /** The password for ReST APIv2 calls. */
  getPassword(): string;
  setPassword(password: string): ITwitarrHTTP;

  /** The authorization key to use for ReST APIv2 calls. */
  getKey(): string;
  setKey(key: string): ITwitarrHTTP;

  /**
   * Perform an HTTP GET to the provided URL.
   * @param url The URL to connect to.
   * @param options The [[TwitarrHTTPOptions]] options to use when connecting.
   * @returns An [[TwitarrResult]] result object.
   */
  get(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;

  /**
   * Perform an HTTP PUT to the provided URL.
   * @param url The URL to connect to.
   * @param options The [[TwitarrHTTPOptions]] options to use when connecting.
   * @returns An [[TwitarrResult]] result object.
   */
  put(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;

  /**
   * Perform an HTTP POST to the provided URL.
   * @param url The URL to connect to.
   * @param options The [[TwitarrHTTPOptions]] options to use when connecting.
   * @returns An [[TwitarrResult]] result object.
   */
  post(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;

  /**
   * Perform an HTTP DELETE to the provided URL.
   * @param url The URL to connect to.
   * @param options The [[TwitarrHTTPOptions]] options to use when connecting.
   * @returns An [[TwitarrResult]] result object.
   */
  httpDelete(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
}
