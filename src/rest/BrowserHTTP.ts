import URI from 'urijs';

import fetchPonyfill from 'fetch-ponyfill';
const { fetch, Headers } = fetchPonyfill();

import { AbstractHTTP } from './AbstractHTTP';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrResult } from '../api/TwitarrResult';
import { TwitarrServer } from '../api/TwitarrServer';

/**
 * Implementation of the [[ITwitarrHTTP]] interface using `fetch`
 * @module BrowserHTTP
 * @implements ITwitarrHTTP
 */
export class BrowserHTTP extends AbstractHTTP {
  /**
   * Construct a BrowserHTTP instance.
   * @param server - The server to connect to.
   * @param timeout - The default timeout for ReST connections.
   */
  public constructor(server?: TwitarrServer, timeout = 10000) {
    super(server, timeout);
  }

  /**
   * Make an HTTP GET call using `fetch({method:'GET'})`.
   */
  public async get(url: string, options?: TwitarrHTTPOptions) {
    const realUrl = this.getServer(options).resolveURL(url) as string;
    const opts = this.getConfig(options);

    const urlObj = new URI(realUrl);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }
    console.debug('GET ' + urlObj.toString());

    opts.method = 'GET';

    return window
      .fetch(urlObj.toString(), opts)
      .then(async response => {
        let type: string | undefined;
        if (response.headers && response.headers.has('Content-Type')) {
          type = response.headers.get('Content-Type') || undefined;
        }
        const data = await this.getResponseData(response);
        if (data && data.status === 'error') {
          throw response;
        }
        return TwitarrResult.ok(data, undefined, response.status, type);
      })
      .catch(err => {
        throw this.handleError(err);
      });
  }

  /**
   * Make an HTTP PUT call using `fetch({method:'PUT'})`.
   */
  public async put(url: string, options?: TwitarrHTTPOptions) {
    const realUrl = this.getServer(options).resolveURL(url) as string;
    const opts = this.getConfig(options);

    const urlObj = new URI(realUrl);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }
    console.debug('PUT ' + urlObj.toString());

    if (options && options.parameters) {
      opts.body = new URLSearchParams(Object.apply({}, options.parameters as any));
    }
    opts.method = 'PUT';

    return window
      .fetch(urlObj.toString(), opts)
      .then(async response => {
        let type: string | undefined;
        if (response.headers && response.headers.has('Content-Type')) {
          type = response.headers.get('Content-Type') || undefined;
        }
        const data = await this.getResponseData(response);
        if (data && data.status === 'error') {
          throw response;
        }
        return TwitarrResult.ok(data, undefined, response.status, type);
      })
      .catch(err => {
        throw this.handleError(err);
      });
  }

  /**
   * Make an HTTP POST call using `fetch({method:'POST'})`.
   */
  public async post(url: string, options?: TwitarrHTTPOptions) {
    const realUrl = this.getServer(options).resolveURL(url) as string;
    const opts = this.getConfig(options);

    const urlObj = new URI(realUrl);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }
    console.debug('POST ' + urlObj.toString());

    if (options && options.data) {
      if (options.data instanceof FormData) {
        opts.body = options.data;
      } else {
        opts.body = JSON.stringify(options.data);
      }
    }
    opts.method = 'POST';

    return window
      .fetch(urlObj.toString(), opts)
      .then(async response => {
        let type: string | undefined;
        if (response.headers && response.headers.has('Content-Type')) {
          type = response.headers.get('Content-Type') || undefined;
        }
        const data = await this.getResponseData(response);
        if (data && data.status === 'error') {
          throw response;
        }
        return TwitarrResult.ok(data, undefined, response.status, type);
      })
      .catch(err => {
        throw this.handleError(err);
      });
  }

  /**
   * Make an HTTP DELETE call using `fetch({method:'DELETE'})`.
   */
  public async httpDelete(url: string, options?: TwitarrHTTPOptions) {
    const realUrl = this.getServer(options).resolveURL(url) as string;
    const opts = this.getConfig(options);

    const urlObj = new URI(realUrl);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }
    console.debug('DELETE ' + urlObj.toString());

    opts.method = 'DELETE';

    return window
      .fetch(urlObj.toString(), opts)
      .then(async response => {
        let type: string | undefined;
        if (response.headers && response.headers.has('Content-Type')) {
          type = response.headers.get('Content-Type') || undefined;
        }
        const data = await this.getResponseData(response);
        if (data && data.status === 'error') {
          throw response;
        }
        return TwitarrResult.ok(data, undefined, response.status, type);
      })
      .catch((err: Error) => {
        throw this.handleError(err);
      });
  }

  /** POST a file. */
  public async postFile(url: string, fileName: string, contentType: string, data: Blob, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>> {
    const opts = this.getOptions(options)
      .withHeader('content-type', 'multipart/form-data')
      .withParameter('key', this.getKey());

    if (!this.server) {
      throw new Error('attempting to post a file, but TwitarrServer is undefined!');
    }

    const fetchObj = this.getFetchObject(fileName, contentType, data, opts);
    const u = URI(this.server.url).resource(this.server.resolveURL(url, opts.parameters) as string);

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

    return fetch(u.toString(), fetchOpts).then(async (response: Response) => {
      const json = await response.json();
      return TwitarrResult.ok(json, undefined, response.status, response.headers.get('Content-Type') || undefined);
    });
  }

  protected getFetchObject(fileName: string, contentType: string, data: Blob, options: TwitarrHTTPOptions): any {
    const fd = new FormData();
    fd.append('name', fileName);
    fd.append('file', data.slice(undefined, undefined, contentType), fileName);

    return {
      body: fd,
      headers: options.headers,
    };
  }

  private async getResponseData(response: Response): Promise<any> {
    try {
      return await response.json();
    } catch (err) {
      return await response.text();
    }
  }

  /**
   * Internal method to turn [[TwitarrHTTPOptions]] into a fetch [[RequestInit]] object.
   * @hidden
   */
  private getConfig(options?: TwitarrHTTPOptions): RequestInit {
    const allOptions = this.getOptions(options);

    const headers = new Headers(allOptions.headers || {});

    const ret: RequestInit = {
      headers,
      credentials: 'same-origin',
      mode: 'cors',
      redirect: 'follow',
    };

    if (allOptions.timeout) {
      console.warn('Fetch does not support timeouts.');
      // ret.timeout = allOptions.timeout;
    }

    if (allOptions.auth && allOptions.auth.username && allOptions.auth.password) {
      headers.set('Authorization', 'Basic ' + btoa(`${allOptions.auth.username}:${allOptions.auth.password}`));
    }

    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/json');
    }
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json;charset=utf-8');
    }

    if (allOptions.data) {
      if (
        allOptions.data instanceof Blob ||
        allOptions.data instanceof FormData ||
        allOptions.data instanceof URLSearchParams ||
        allOptions.data instanceof ReadableStream
      ) {
        ret.body = allOptions.data;
      } else {
        ret.body = JSON.stringify(allOptions.data);
      }
    }

    return ret;
  }
}
