/** @hidden */
declare const Promise;
/** @hidden */
declare const require;

/** @hidden */
// tslint:disable-next-line
const URI = require('urijs');

import { AbstractHTTP } from '../../src/rest/AbstractHTTP';

import { TwitarrHTTPOptions } from '../../src/api/TwitarrHTTPOptions';
import { TwitarrResult } from '../../src/api/TwitarrResult';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const getError = (method: string, url: string, options?: TwitarrHTTPOptions) => {
  // tslint:disable-next-line
  return new Error('Not yet implemented: ' + method + ' ' + url + ': ' + JSON.stringify(options.parameters) + ' ' + JSON.stringify(options.data));
};

export class MockHTTP extends AbstractHTTP {
  /** make an HTTP get call -- this should be overridden by the implementation */
  public get(url: string, options?: TwitarrHTTPOptions) {
    const urlObj = new URI(url);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }

    console.log(urlObj.toString());
    switch (urlObj.toString()) {
      case 'http://demo.twitarr.com/api/v2/text/welcome': {
        const result = TwitarrResult.ok(require('../data/welcome.json'));
        result.type = 'application/json';
        return Promise.resolve(result);
      }
      case '/api/v2/seamail': {
        const result = TwitarrResult.ok(require('../data/seamail.json'));
        result.type = 'application/json';
        return Promise.resolve(result);
      }
      /*
      case 'http://demo.opennms.org/opennms/rest/info': {
        return Promise.resolve(TwitarrResult.ok({}));
      }
      case 'http://demo.opennms.org/opennms/rest/alarms/count': {
        return Promise.resolve(TwitarrResult.ok(1));
      }
      case 'rest/alarms/404725': {
        const result = TwitarrResult.ok(require('./19.1.0/get/rest/alarms/404725.json'));
        result.type = 'application/json';
        return Promise.resolve(result);
      }
      */
    }

    return Promise.reject(getError('GET', url, options));
  }

  public put(url: string, options?: TwitarrHTTPOptions) {
    const urlObj = new URI(url);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }

    switch (urlObj.toString()) {
      /*
      case 'rest/alarms/404725?ack=true': {
        const result = TwitarrResult.ok('');
        result.type = 'text/plain';
        return Promise.resolve(result);
      }
      */
    }

    return Promise.reject(getError('PUT', url, options));
  }

  public post(url: string, options?: TwitarrHTTPOptions) {
    const urlObj = new URI(url);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }

    switch (urlObj.toString()) {
      case '/api/v2/user/auth': {
        if (options.data.username === 'demo' && options.data.password === 'demo') {
          const result = TwitarrResult.ok({
            key: 'demo:12345',
            status: 'ok',
            username: 'demo',
          });
          result.type = 'application/json';
          return Promise.resolve(result);
        } else if (options.data.username === 'demo' && options.data.password === 'invalid') {
          const result = this.handleError({
            response: {
              code: 401,
              data: {
                message: 'invalid username or password',
                status: 'error',
              },
            },
          });
          return Promise.reject(result);
        }
      }
    }

    return Promise.reject(getError('POST', url, options));
  }

  public httpDelete(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>> {
    const urlObj = new URI(url);
    return Promise.reject(getError('DELETE', url, options));
  }
}
