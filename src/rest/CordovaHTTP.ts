import clonedeep from 'lodash.clonedeep';
import URI from 'urijs';

import { AbstractHTTP } from './AbstractHTTP';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrResult } from '../api/TwitarrResult';
import { TwitarrServer } from '../api/TwitarrServer';

interface ICordovaHTTPOptions {
  method?: 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'upload' | 'download';
  data?: any;
  params: { [key: string]: string };
  serializer?: 'urlencoded' | 'json' | 'utf8';
  timeout?: number;
  headers: { [key: string]: string };
  filePath?: string;
  name?: string;
}

/**
 * Implementation of the [[ITwitarrHTTP]] interface using cordova-plugin-advanced-http
 * @module CordovaHTTP
 * @implements ITwitarrHTTP
 */
export class CordovaHTTP extends AbstractHTTP {
  private initialized = false;

  /**
   * Construct a CordovaHTTP instance.
   * @param server - The server to connect to.
   * @param timeout - The default timeout for ReST connections.
   */
  public constructor(server?: TwitarrServer, timeout = 10000) {
    super(server, timeout);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (!window.cordova || !window.cordova.plugin || !window.cordova.plugin.http) {
      throw new Error('cordova-plugin-advanced-http is not available!');
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.cordova.plugin.http.setDataSerializer('json');
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.cordova.plugin.http.setRequestTimeout(timeout / 1000.0);
  }

  /**
   * Make an HTTP GET call using `cordova.plugin.http.get`.
   */
  public get(url: string, options?: TwitarrHTTPOptions) {
    const realUrl = this.getServer(options).resolveURL(url) as string;
    const opts = this.getConfig(options);

    const urlObj = new URI(realUrl);
    urlObj.search(opts.params);
    console.debug('GET ' + urlObj.toString());

    opts.method = 'get';

    return this.request(urlObj.toString(), opts);
  }

  /**
   * Make an HTTP PUT call using `cordova.plugin.http.put`.
   */
  public put(url: string, options?: TwitarrHTTPOptions) {
    const realUrl = this.getServer(options).resolveURL(url) as string;
    const opts = this.getConfig(options);

    const urlObj = new URI(realUrl);
    urlObj.search(opts.params);
    console.debug('PUT ' + urlObj.toString());

    opts.data = Object.apply({}, opts.params as any);
    opts.method = 'put';

    return this.request(urlObj.toString(), opts);
  }

  /**
   * Make an HTTP POST call using `cordova.plugin.http.post`.
   */
  public post(url: string, options?: TwitarrHTTPOptions) {
    const realUrl = this.getServer(options).resolveURL(url) as string;
    const opts = this.getConfig(options);

    const urlObj = new URI(realUrl);
    urlObj.search(opts.params);
    console.debug('POST ' + urlObj.toString());

    opts.method = 'post';

    return this.request(urlObj.toString(), opts);
  }

  /**
   * Make an HTTP DELETE call using `cordova.plugin.http.delete`.
   */
  public httpDelete(url: string, options?: TwitarrHTTPOptions) {
    const realUrl = this.getServer(options).resolveURL(url) as string;
    const opts = this.getConfig(options);

    const urlObj = new URI(realUrl);
    urlObj.search(opts.params);
    console.debug('DELETE ' + urlObj.toString());

    opts.method = 'delete';

    return this.request(urlObj.toString(), opts);
  }

  /** POST a file. */
  // eslint-disable-next-line
  public async postFile(url: string, fileName: string, contentType: string, data: Blob, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>> {
    throw new Error('Not yet implemented!');
    /*
    const opts = this.getOptions(options)
      .withHeader('content-type', 'multipart/form-data')
      .withParameter('key', this.getKey());

    const fetchObj = this.getFetchObject(fileName, contentType, data, opts);
    const u = URI(this.server.url).resource(this.server.resolveURL(url, opts.parameters));

    const fetchOpts = Object.assign(
      {
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
      },
      fetchObj,
    );

    return fetch(u.toString(), fetchOpts).then(async response => {
      const json = await response.json();
      return TwitarrResult.ok(json, undefined, response.status, response.headers['content-type']);
    });
    */
  }

  /*
  protected getFetchObject(fileName: string, contentType: string, data: Blob, options: TwitarrHTTPOptions): any {
    const fd = new FormData();
    fd.append('name', fileName);
    fd.append('file', new Blob([data], { type: contentType }), fileName);

    return {
      body: fd,
      headers: options.headers,
    };
  }
  */

  /**
   * Make a request.
   */
  protected async request(url: string, opts: ICordovaHTTPOptions) {
    await this.initializeSSL();
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line prettier/prettier
      window.cordova.plugin.http.sendRequest(
        url,
        opts,
        (response: any) => resolve(response),
        (err: Error) => reject(err),
      );
    })
      .then((response: any) => {
        let type;
        if (response.headers && response.headers['content-type']) {
          type = response.headers['content-type'];
        }
        const data = this.getData(response);
        if (data && data.status === 'error') {
          throw response;
        }
        return TwitarrResult.ok(this.getData(response), undefined, response.status, type);
      })
      .catch(err => {
        throw this.handleError(err);
      });
  }

  /**
   * Internal method to turn [[TwitarrHTTPOptions]] into a cordova.plugin.http object.
   * @hidden
   */
  private getConfig(options?: TwitarrHTTPOptions): ICordovaHTTPOptions {
    const allOptions = this.getOptions(options);

    const ret: ICordovaHTTPOptions = {
      params: {},
      headers: {},
    };

    // cordova.plugin.http timeout is in seconds, rather than ms
    if (allOptions.timeout) {
      ret.timeout = allOptions.timeout / 1000.0;
    }

    if (allOptions.headers && Object.keys(allOptions.headers).length > 0) {
      ret.headers = clonedeep(allOptions.headers);
    } else {
      ret.headers = {};
    }

    if (!ret.headers.accept) {
      ret.headers.accept = 'application/json';
    }
    if (!ret.headers['content-type']) {
      ret.headers['content-type'] = 'application/json;charset=utf-8';
    }

    if (allOptions.parameters) {
      ret.params = clonedeep(allOptions.parameters);
    }
    if (Object.keys(ret.params).length === 0) {
      delete ret.params;
    }

    if (allOptions.data) {
      ret.data = clonedeep(allOptions.data);
    }

    return ret;
  }

  private async initializeSSL() {
    if (this.initialized) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      window.cordova.plugin.http.setSSLCertMode(
        'nocheck',
        () => {
          this.initialized = true;
          resolve();
        },
        () => {
          this.initialized = true;
          reject();
        },
      );
    });
  }
}
