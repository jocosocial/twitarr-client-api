import { ITwitarrHTTP } from '../api/ITwitarrHTTP';
import { TwitarrError } from '../api/TwitarrError';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrResult } from '../api/TwitarrResult';
import { TwitarrServer } from '../api/TwitarrServer';
import { JsonTransformer } from './JsonTransformer';

/** @hidden */
const jsonTransformer = new JsonTransformer();

/** @hidden */
const OPTIONS_PROP = Symbol.for('options');

/**
 * Abstract implementation of the TwitarrHTTP interface meant to be extended by a concrete class.
 * @module AbstractHTTP
 * @implements ITwitarrHTTP
 */
export abstract class AbstractHTTP implements ITwitarrHTTP {
  private [OPTIONS_PROP] = new TwitarrHTTPOptions();

  /** The default set of HTTP options associated with this ReST client. */
  public get options(): TwitarrHTTPOptions {
    if (!this[OPTIONS_PROP]) {
      this[OPTIONS_PROP] = new TwitarrHTTPOptions();
    }
    return this[OPTIONS_PROP];
  }

  public set options(o: TwitarrHTTPOptions) {
    this[OPTIONS_PROP] = o;
  }

  /**
   * The server metadata we'll use for constructing ReST calls.
   * @hidden
   */
  private serverObj: TwitarrServer | undefined;

  /** The server associated with this HTTP implementation. */
  public get server() {
    return this.serverObj;
  }

  public set server(server: TwitarrServer | undefined) {
    this.serverObj = server;
    this.onSetServer();
  }

  /**
   * Create a new HTTP instance.
   * @constructor
   * @param server - A server object for immediate configuration.
   * @param timeout - How long to wait until timing out requests.
   */
  public constructor(server?: TwitarrServer, timeout?: number) {
    if (server) {
      this.serverObj = server;
    }
    if (timeout) {
      this.options.timeout = timeout;
    }
  }

  public getUsername() {
    return this.server && this.server.auth && this.server.auth.username ? this.server.auth.username : null;
  }

  public setUsername(username: string): ITwitarrHTTP {
    if (this.server && this.server.auth) {
      this.server.auth.username = username;
    } else {
      throw new TwitarrError('server auth not yet configured!');
    }
    return this as ITwitarrHTTP;
  }

  public getPassword() {
    return this.server && this.server.auth && this.server.auth.password ? this.server.auth.password : null;
  }

  public setPassword(password: string): ITwitarrHTTP {
    if (this.server && this.server.auth) {
      this.server.auth.password = password;
    } else {
      throw new TwitarrError('server auth not yet configured!');
    }
    return this as ITwitarrHTTP;
  }

  public getKey() {
    return this.server && this.server.auth && this.server.auth.key ? this.server.auth.key : null;
  }

  public setKey(key: string): ITwitarrHTTP {
    if (this.server && this.server.auth) {
      this.server.auth.key = key;
    } else {
      throw new TwitarrError('server auth not yet configured!');
    }
    return this;
  }

  /** Make an HTTP GET call. This must be implemented by the concrete implementation. */
  public abstract get(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;

  /** Make an HTTP PUT call. This must be overridden by the concrete implementation. */
  public abstract put(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;

  /** Make an HTTP POST call. This must be overridden by the concrete implementation. */
  public abstract post(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;

  /** Make an HTTP DELETE call. This must be overridden by the concrete implementation. */
  public abstract httpDelete(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;

  /** POST a file.  This must be overridden by the concrete implementation. */
  public abstract postFile(url: string, fileName: string, contentType: string, data: Buffer, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;

  /**
   * A convenience method for implementers to use to turn JSON into a javascript object.
   * Use this to process a JSON response before returning it in an [[TwitarrResult]] object.
   */
  protected transformJSON(data: any) {
    return jsonTransformer.transform(data);
  }

  /** Attempt to extract the data from a response. */
  protected getData(response: any) {
    const type = this.getType(response);
    if (type === 'json') {
      return this.transformJSON(response.data);
    } else {
      return response.data;
    }
  }

  /**
   * Attempt to determine the type of response.
   * @hidden
   */
  protected getType(response: any) {
    if (response.headers['content-type'] && response.headers['content-type'].startsWith('application/json')) {
      return 'json';
    } else if (response.config.responseType === 'json') {
      return 'json';
    } else if (response.config.headers.accept && response.headers.accept.startsWith('application/json')) {
      return 'json';
    } else if (response.responseType === 'json') {
      return 'json';
    }
    return 'text';
  }

  /**
   * Get the [[TwitarrServer]] object that should be used for making requests.  Favors the one
   * passed in the [[TwitarrHTTPOptions]], otherwise it falls back to the default server associated
   * with the HTTP implementation.
   */
  protected getServer(options?: TwitarrHTTPOptions): TwitarrServer {
    if (options && options.server) {
      return options.server;
    }
    if (!this.serverObj) {
      throw new TwitarrError('getServer() called but server has never been initialized!');
    }
    return this.serverObj;
  }

  /**
   * Get the union of [[TwitarrHTTPOptions]] based on the passed options, defaults,
   * and options in the [[TwitarrServer]] associated with this request.  Order of
   * precedence is passed options -> server options -> default options.
   */
  protected getOptions(options?: TwitarrHTTPOptions): TwitarrHTTPOptions {
    const ret = new TwitarrHTTPOptions();
    Object.assign(ret, this.options);

    const server = this.getServer(options);
    ret.server = server;
    Object.assign(ret, options);
    if (!ret.headers.hasOwnProperty('X-Requested-With')) {
      ret.headers['X-Requested-With'] = 'XMLHttpRequest';
    }
    if (!ret.parameters.hasOwnProperty('key')) {
      const key = this.getKey();
      if (key) {
        ret.parameters.key = key;
      }
    }
    return ret;
  }

  /**
   * Implementers should override this method if they have actions that need to be performed
   * (like clearing a cache) when server settings change.
   */
  protected onSetServer() {
    // do nothing by default
  }

  /**
   * Create a [[TwitarrError]] from an error response.
   * @hidden
   */
  protected handleError(err: any, options?: any): TwitarrError {
    const message = AbstractHTTP.extractMessage(err);
    const code = AbstractHTTP.extractCode(err);
    const errors = AbstractHTTP.extractError(err);
    const data = AbstractHTTP.extractData(err);
    return new TwitarrError(message, code, errors, options, data);
  }

  /**
   * Attempt to determine an error message from an error response.
   * @hidden
   */
  protected static extractMessage(err: any): string {
    if (err) {
      if (err.message) {
        return err.message;
      } else if (err.response) {
        return this.extractMessage(err.response);
      } else if (err.data && Object.prototype.toString.call(err.data) === '[object String]') {
        return err.data;
      } else if (err.data && err.data.message) {
        return err.data.message;
      } else if (err.statusText) {
        return err.statusText;
      }
      return JSON.stringify(err);
    }
    return 'no error message';
  }

  /**
   * Attempt to determine an error status code from an error response.
   * @hidden
   */
  protected static extractCode(err: any): number {
    let code = -1;
    if (err.code) {
      code = err.code;
    } else if (err.response && err.response.code !== undefined) {
      code = parseInt(err.response.code, 10);
    } else if (err.status && typeof err.status === 'number') {
      code = err.status;
    } else if (err.response && err.response.status && typeof err.response.status === 'number') {
      code = err.response.status;
    }
    return code;
  }

  /**
   * Attempt to determine the error message in an error response.
   * @hidden
   */
  protected static extractError(err: any): any {
    if (err && err.response && err.response.data && err.response.data.status === 'error' && (err.response.data.error || err.response.data.errors)) {
      return err.response.data.error || err.response.data.errors;
    }
    return undefined;
  }

  /**
   * Attempt to determine the data in an error response.
   * @hidden
   */
  protected static extractData(err: any): any {
    if (err && err.response && err.response.data && err.response.data.status !== 'error') {
      return err.response.data;
    }
    return undefined;
  }
}
