import { TwitarrAuthConfig } from './TwitarrAuthConfig';
import { TwitarrServer } from './TwitarrServer';
import { IHash } from '../internal/IHash';

const DEFAULT_TIMEOUT = 10000;

const TIMEOUT_PROP = Symbol.for('timeout');
const AUTH_PROP = Symbol.for('auth');

/**
 * Options to be used when making HTTP ReST calls.
 * @module TwitarrHTTPOptions
 */
export class TwitarrHTTPOptions {
  /** How long to wait for ReST calls to time out. */
  public get timeout(): number {
    if (this[TIMEOUT_PROP]) {
      return this[TIMEOUT_PROP];
    }
    return DEFAULT_TIMEOUT;
  }

  public set timeout(t: number) {
    this[TIMEOUT_PROP] = t;
  }

  /** The authentication config that should be used when no auth is associated with the [[TwitarrServer]]. */
  public get auth(): TwitarrAuthConfig {
    if (!this[AUTH_PROP]) {
      this[AUTH_PROP] = new TwitarrAuthConfig();
    }
    return this[AUTH_PROP];
  }

  public set auth(a: TwitarrAuthConfig) {
    this[AUTH_PROP] = a;
  }

  /** The server to use if no server is set on the HTTP implementation. */
  public server: TwitarrServer;

  /** HTTP headers to be passed to the request. */
  public headers: IHash<string> = {};

  /** HTTP parameters to be passed on the URL. */
  public parameters: IHash<string> = {};

  /** HTTP data to be passed when POSTing */
  public data: any;

  private [TIMEOUT_PROP]: number;

  private [AUTH_PROP]: TwitarrAuthConfig;

  /**
   * Construct a new TwitarrHTTPOptions object.
   * @constructor
   */
  public constructor(timeout?: number, auth?: TwitarrAuthConfig, server?: TwitarrServer) {
    if (timeout !== undefined) {
      this.timeout = timeout;
    }
    if (auth !== undefined) {
      this.auth = auth;
    }
    if (server !== undefined) {
      this.server = server;
    }
  }

  /**
   * Add a header.  Returns the TwitarrHTTPOptions object so it can be chained.
   * @param key - the header
   * @param value - the header value
   */
  public withHeader(header: string, value: string): TwitarrHTTPOptions {
    this.headers[header] = value;
    return this;
  }

  /**
   * Add a URL parameter. Returns the TwitarrHTTPOptions object so it can be chained.
   * @param key - the parameter's key
   * @param value - the parameter's value
   */
  public withParameter(key: string, value?: any): TwitarrHTTPOptions {
    if (value !== undefined) {
      this.parameters[key] = '' + value;
    }
    return this;
  }

  /**
   * Set the data to be passed when POSTing.
   * @param data - the data to POST
   */
  public withData(data: any): TwitarrHTTPOptions {
    this.data = {};
    Object.assign(this.data, data);
    return this;
  }

  public toJSON(): object {
    const ret = Object.assign({}, this);
    if (this[TIMEOUT_PROP]) {
      ret.timeout = this.timeout;
      delete ret[TIMEOUT_PROP];
    }
    if (this[AUTH_PROP]) {
      ret.auth = this.auth;
      delete ret[AUTH_PROP];
    }
    return ret;
  }
}
