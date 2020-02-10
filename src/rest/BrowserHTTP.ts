import axios from 'axios';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import clonedeep from 'lodash.clonedeep';

let fetch: any;
if (!fetch) {
  fetch = require('node-fetch');
}

/** @hidden */
const URI = require('urijs');

import { AbstractHTTP } from './AbstractHTTP';
import { TwitarrError } from '../api/TwitarrError';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrResult } from '../api/TwitarrResult';
import { TwitarrServer } from '../api/TwitarrServer';

/**
 * Implementation of the [[ITwitarrHTTP]] interface using Axios: https://github.com/mzabriskie/axios
 * @module AxiosHTTP
 * @implements ITwitarrHTTP
 */
export class BrowserHTTP extends AbstractHTTP {
  /**
   * The Axios instance we'll use for making ReST calls.  This will be reinitialized whenever
   * the server configuration changes.
   */
  private axiosObj: AxiosInstance | undefined;

  /**
   * Construct an AxiosHTTP instance.
   * @param server - The server to connect to.
   * @param timeout - The default timeout for ReST connections.
   */
  public constructor(server?: TwitarrServer, timeout = 10000) {
    super(server, timeout);
  }

  /**
   * Make an HTTP GET call using `axios.request({method:'get'})`.
   */
  public get(url: string, options?: TwitarrHTTPOptions) {
    const realUrl = this.getServer(options).resolveURL(url);
    const opts = this.getConfig(options);

    const urlObj = new URI(realUrl);
    urlObj.search(opts.params);
    console.debug('GET ' + urlObj.toString());

    opts.method = 'get';
    opts.url = realUrl;

    return this.getImpl(options)
      .request(opts)
      .then(response => {
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
        throw this.handleError(err, opts);
      });
  }

  /**
   * Make an HTTP PUT call using `axios.request({method:'put'})`.
   */
  public put(url: string, options?: TwitarrHTTPOptions) {
    const realUrl = this.getServer(options).resolveURL(url);
    const opts = this.getConfig(options);

    const urlObj = new URI(realUrl);
    urlObj.search(opts.params);
    console.debug('PUT ' + urlObj.toString());

    opts.data = Object.apply({}, opts.params);
    opts.method = 'put';
    opts.url = realUrl;

    return this.getImpl(options)
      .request(opts)
      .then(response => {
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
        throw this.handleError(err, opts);
      });
  }

  /**
   * Make an HTTP POST call using `axios.request({method:'post'})`.
   */
  public post(url: string, options?: TwitarrHTTPOptions) {
    const realUrl = this.getServer(options).resolveURL(url);
    const opts = this.getConfig(options);

    const urlObj = new URI(realUrl);
    urlObj.search(opts.params);
    console.debug('POST ' + urlObj.toString());

    opts.method = 'post';
    opts.url = realUrl;

    return this.getImpl(options)
      .request(opts)
      .then(response => {
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
        throw this.handleError(err, opts);
      });
  }

  /**
   * Make an HTTP DELETE call using `axios.request({method:'delete'})`.
   */
  public httpDelete(url: string, options?: TwitarrHTTPOptions) {
    const realUrl = this.getServer(options).resolveURL(url);
    const opts = this.getConfig(options);

    const urlObj = new URI(realUrl);
    urlObj.search(opts.params);
    console.debug('DELETE ' + urlObj.toString());

    opts.method = 'delete';
    opts.url = realUrl;

    return this.getImpl(options)
      .request(opts)
      .then(response => {
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
        throw this.handleError(err, opts);
      });
  }

  /** POST a file. */
  public async postFile(url: string, fileName: string, contentType: string, data: Buffer, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>> {
    const opts = this.getOptions(options)
      .withHeader('content-type', 'multipart/form-data')
      .withParameter('key', this.getKey());

    if (!this.server) {
      throw new TwitarrError('attempting to post a file, but TwitarrServer is undefined!');
    }

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

    return fetch(u.toString(), fetchOpts).then(async (response: Response) => {
      const json = await response.json();
      return TwitarrResult.ok(json, undefined, response.status, response.headers.get('content-type') || undefined);
    });
  }

  protected getFetchObject(fileName: string, contentType: string, data: Buffer, options: TwitarrHTTPOptions): any {
    const fd = new FormData();
    fd.append('name', fileName);
    fd.append('file', new Blob([data], { type: contentType }), fileName);

    return {
      body: fd,
      headers: options.headers,
    };
  }

  /**
   * Clear the current [[AxiosInstance]] so it is recreated on next request with the
   * new server configuration.
   */
  protected onSetServer() {
    super.onSetServer();
    this.axiosObj = undefined;
  }

  /**
   * Internal method to turn [[TwitarrHTTPOptions]] into an [[AxiosRequestConfig]] object.
   * @hidden
   */
  private getConfig(options?: TwitarrHTTPOptions): AxiosRequestConfig {
    const allOptions = this.getOptions(options);

    const ret: AxiosRequestConfig = {
      transformResponse: [], // we do this so we can post-process only on success
    };

    if (allOptions.auth && allOptions.auth.username && allOptions.auth.password) {
      ret.auth = {
        password: allOptions.auth.password,
        username: allOptions.auth.username,
      };
    }

    if (allOptions.timeout) {
      ret.timeout = allOptions.timeout;
    }

    if (allOptions.headers) {
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

    const type = ret.headers.accept;
    ret.transformResponse = [];
    if (type === 'application/json') {
      ret.responseType = 'json';
    } else if (type === 'text/plain') {
      ret.responseType = 'text';
    } else {
      throw new TwitarrError('Unhandled "Accept" header: ' + type);
    }

    if (allOptions.parameters) {
      ret.params = clonedeep(allOptions.parameters);
    }

    if (allOptions.data) {
      ret.data = clonedeep(allOptions.data);
    }

    return ret;
  }

  /**
   * Internal method for getting/constructing an Axios object on-demand,
   * based on the current server configuration.
   * @hidden
   */
  private getImpl(options?: TwitarrHTTPOptions) {
    if (!this.axiosObj) {
      const server = this.getServer(options);
      if (!server) {
        throw new TwitarrError('You must set a server before attempting to make queries using Axios!');
      }
      const allOptions = this.getOptions(options);

      const axiosOpts: AxiosRequestConfig = {
        baseURL: server.url,
        timeout: allOptions.timeout,
        withCredentials: true,
      };

      if (typeof XMLHttpRequest !== 'undefined') {
        axiosOpts.adapter = require('axios/lib/adapters/xhr.js');
      } else if (typeof process !== 'undefined') {
        axiosOpts.adapter = require('axios/lib/adapters/http.js');
      }

      this.axiosObj = axios.create(axiosOpts);
    }
    return this.axiosObj;
  }
}
