import { IHasHTTP } from './api/IHasHTTP';
import { ITwitarrHTTP } from './api/ITwitarrHTTP';

import { TwitarrHTTPOptions } from './api/TwitarrHTTPOptions';
import { TwitarrError } from './api/TwitarrError';

import { TwitarrServer } from './api/TwitarrServer';

import { BrowserHTTP } from './rest/BrowserHTTP';
import { UserDAO } from './dao/UserDAO';
import { PhotoDAO } from './dao/PhotoDAO';
import { SeamailDAO } from './dao/SeamailDAO';
import { StreamDAO } from './dao/StreamDAO';

/**
 * The Twitarr client.  This is the primary interface to Twitarr servers.
 * @module Client
 */
export class Client implements IHasHTTP {
  /**
   * Given an TwitarrServer object, check that it can be connected to.
   *
   * @param server - the server to check
   * @param httpImpl - the [[ITwitarrHTTP]] implementation to use
   * @param timeout - how long to wait before giving up when making ReST calls
   */
  public static async checkServer(server: TwitarrServer, httpImpl?: ITwitarrHTTP, timeout?: number): Promise<boolean> {
    const opts = new TwitarrHTTPOptions(timeout, server.auth, server);
    if (!httpImpl) {
      if (!Client.defaultHttp) {
        throw new TwitarrError('No HTTP implementation is configured!');
      }
      httpImpl = Client.defaultHttp;
    }
    opts.headers.accept = 'application/json';

    const welcomeUrl = server.resolveURL('api/v2/text/welcome');
    console.debug('checkServer: checking URL: ' + welcomeUrl);
    await httpImpl.get(welcomeUrl, opts);
    return true;
  }

  /** The default TwitarrHTTP implementation to be used when making requests */
  private static defaultHttp: ITwitarrHTTP;

  /** the TwitarrHTTP implementation that will be used when making requests */
  public http: ITwitarrHTTP;

  /** The remote server to connect to */
  public server: TwitarrServer;

  /**
   * Construct a new Twitarr client.
   * @constructor
   * @param httpImpl - The TwitarrHTTP implementation to use. Normally
   *        this will automatically choose the best implementation
   *        based on the environment.
   */
  constructor(httpImpl?: ITwitarrHTTP) {
    if (httpImpl) {
      Client.defaultHttp = httpImpl;
    } else {
      Client.defaultHttp = new BrowserHTTP();
    }
    this.http = Client.defaultHttp;
  }

  public async isLoggedIn(): Promise<boolean> {
    try {
      return this.user().getProfile().then(() => {
        return true;
      });
    } catch (err) {
      return false;
    }
  }

  /**
   * Connect to an Twitarr server and return a [[TwitarrServer]] for that connection.
   */
  public async connect(name: string, url: string, username: string, password: string, timeout?: number) {
    const self = this;
    const server = new TwitarrServer(name, url, username, password);

    await Client.checkServer(server, undefined, timeout);

    if (!self.http) {
      self.http = Client.defaultHttp;
    }
    if (!self.http.server) {
      self.http.server = server;
    }
    self.server = server;

    if (self.server.auth.key) {
      try {
        const profile = await this.user().getProfile();
        console.debug('found auth key:', self.server.auth.key, profile);
        return self;
      } catch (err) {
        console.error('auth key was invalid:', err);
      }
    }

    try {
      return await this.user().login();
    } catch (err) {
      if (err.code === 401) {
        throw new TwitarrError('username or password was invalid', err.code, err.options, err.errors, err.data);
      }
      throw new TwitarrError('unexpected error: ' + err.message, err.code, err.options, err.errors, err.data);
    }
  }

  /**
   * Get a user DAO.
   */
  public user() {
    return new UserDAO(this);
  }

  /**
   * Get a photo DAO.
   */
  public photo() {
    return new PhotoDAO(this);
  }

  /**
   * Get a seamail DAO.
   */
  public seamail() {
    return new SeamailDAO(this);
  }

  /**
   * Get a stream DAO.
   */
  public stream() {
    return new StreamDAO(this);
  }
}
