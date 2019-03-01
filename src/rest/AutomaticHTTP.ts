import { ITwitarrHTTP } from '../api/ITwitarrHTTP';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrServer } from '../api/TwitarrServer';

import { CordovaHTTP } from './CordovaHTTP';

import { isNode } from 'browser-or-node';
import { NodeHTTP } from './NodeHTTP';
import { BrowserHTTP } from './BrowserHTTP';

export class AutomaticHTTP implements ITwitarrHTTP {
  private impl: ITwitarrHTTP;

  public constructor(server?: TwitarrServer, timeout = 10000) {
    // @ts-ignore
    if (cordova && cordova.plugin && cordova.plugin.http) {
      console.debug('cordove-plugin-advanced-http found!  Using CordovaHTTP implementation.');
      this.impl = new CordovaHTTP(server, timeout);
    } else if (isNode) {
      console.debug('Node.js environment found.  Using NodeHTTP implementation.');
      this.impl = new NodeHTTP(server, timeout);
    } else {
      console.debug('Node.js and cordove-plugin-advanced-http not found.  Using BrowserHTTP implementation.');
      this.impl = new BrowserHTTP(server, timeout);
    }
  }

  public get server() {
    return this.impl.server;
  }
  public set server(server) {
    this.impl.server = server;
  }

  public get options() {
    return this.impl.options;
  }
  public set options(options) {
    this.impl.options = options;
  }

  public getUsername() {
    return this.impl.getUsername();
  }
  public setUsername(username: string) {
    return this.impl.setUsername(username);
  }
  public getPassword() {
    return this.impl.getPassword();
  }
  public setPassword(password: string) {
    return this.impl.setPassword(password);
  }
  public getKey() {
    return this.impl.getKey();
  }
  public setKey(key: string) {
    return this.impl.setKey(key);
  }

  public get(url: string, options?: TwitarrHTTPOptions) {
    return this.impl.get(url, options);
  }

  public put(url: string, options?: TwitarrHTTPOptions) {
    return this.impl.put(url, options);
  }

  public post(url: string, options?: TwitarrHTTPOptions) {
    return this.impl.post(url, options);
  }

  public httpDelete(url: string, options?: TwitarrHTTPOptions) {
    return this.impl.httpDelete(url, options);
  }

  public postFile(url: string, fileName: string, contentType: string, data: Buffer, options?: TwitarrHTTPOptions) {
    return this.impl.postFile(url, fileName, contentType, data, options);
  }
}
