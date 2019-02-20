/** @hidden */
const URI = require('urijs');

import { TwitarrAuthConfig } from './TwitarrAuthConfig';
import { UUID } from '../internal/UUID';

/**
 * Represents a remote Twitarr server.
 * @module TwitarrServer
 */
export class TwitarrServer {
  /** A unique identifier for this server. */
  public id: string;

  /** An optional name associated with this server. */
  public name?: string;

  /** The base URL to the server. */
  public url: string;

  /** The authorization configuration associated with the server. */
  public auth: TwitarrAuthConfig;

  /**
   * Construct a new TwitarrServer object representing a remote server.
   * @example
   * <caption>provide a pre-existing [[TwitarrAuthConfig]] for auth</caption>
   * ```javascript
   * const server = new TwitarrServer('Test', 'https://myserver/', auth);
   * ```
   * @example
   * <caption>provide a username and password for auth</caption>
   * ```javascript
   * const server = new TwitarrServer('Test', 'https://myserver/', 'admin', 'admin');
   * ```
   * @constructor
   * @param name - A name for the server suitable for display.
   * @param url - The URL to the server.
   * @param auth - A [[TwitarrAuthConfig]], or the username to authorize as.
   * @param password - The password to authorize with if a username was
   *                   supplied to the `auth` parameter.
   */
  public constructor(name?: string, url?: string, auth?: TwitarrAuthConfig | string, password?: string) {
    this.id = UUID.generate();
    this.name = name;
    this.url = url;
    if (auth instanceof TwitarrAuthConfig) {
      this.auth = auth;
    } else {
      this.auth = new TwitarrAuthConfig(auth, password);
    }
  }

  /**
   * Given a relative URL fragment, construct a URL for that fragment on the server.
   * @param forFragment - The URL fragment to append to the server URL.
   * @parm withQuery - Query parameters to be appended to the URL.
   * @returns A complete URL.
   */
  public resolveURL(forFragment?: string, withQuery?: any) {
    if (!this.url) {
      return undefined;
    }
    if (forFragment === undefined) {
      return this.url;
    }
    let uri = URI(this.url);
    if (forFragment.indexOf('/') === 0 || forFragment.indexOf('http') === 0) {
      uri = URI(forFragment);
    } else {
      uri = uri.segment(forFragment);
    }
    if (withQuery !== undefined) {
      uri = uri.addQuery(withQuery);
    }
    return uri.toString();
  }

  /**
   * Create a new server object from this existing one.
   */
  public clone() {
    const auth = this.auth ? this.auth.clone() : undefined;
    const ret = new TwitarrServer(this.name, this.url, auth);
    return ret;
  }

  /**
   * Get the hostname portion of the URL associated with this server.
   */
  public get host() {
    if (!this.url) {
      return undefined;
    }
    return URI(this.url).hostname();
  }

  /** A string representation of this server suitable for display. */
  public toString() {
    return 'Twitarr at ' + (this.host || this.url);
  }
}
