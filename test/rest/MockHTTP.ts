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

const getError = (method: string, urlObj: any, options?: TwitarrHTTPOptions) => {
  // tslint:disable-next-line
  return new Error('Not yet implemented: ' + method + ' ' + urlObj.toString() + ': ' + JSON.stringify(options.parameters) + ' ' + JSON.stringify(options.data));
};

export class MockHTTP extends AbstractHTTP {
  /** make an HTTP get call -- this should be overridden by the implementation */
  public get(url: string, options?: TwitarrHTTPOptions) {
    const urlObj = new URI(url);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }

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
      case '/api/v2/seamail?unread=true': {
        const result = TwitarrResult.ok(require('../data/seamail-unread-true.json'));
        result.type = 'application/json';
        return Promise.resolve(result);
      }
      case '/api/v2/seamail?after=1549827395180': {
        const result = TwitarrResult.ok(require('../data/seamail-after-epoch.json'));
        result.type = 'application/json';
        return Promise.resolve(result);
      }
      case '/api/v2/seamail_threads': {
        const result = TwitarrResult.ok(require('../data/seamail_threads.json'));
        result.type = 'application/json';
        return Promise.resolve(result);
      }
      case '/api/v2/seamail_threads?exclude_read_messages=true': {
        const result = TwitarrResult.ok(require('../data/seamail_threads-exclude_read_messages-true.json'));
        result.type = 'application/json';
        return Promise.resolve(result);
      }
      case '/api/v2/seamail_threads?unread=true': {
        const result = TwitarrResult.ok(require('../data/seamail_threads-unread-true.json'));
        result.type = 'application/json';
        return Promise.resolve(result);
      }
      case '/api/v2/seamail_threads?after=1549827390000': {
        const result = TwitarrResult.ok(require('../data/seamail_threads-after-epoch.json'));
        result.type = 'application/json';
        return Promise.resolve(result);
      }
      case '/api/v2/seamail/5c607d43ea204f5815755cda': {
        const result = TwitarrResult.ok(require('../data/seamail-5c607d43ea204f5815755cda.json'));
        result.type = 'application/json';
        return Promise.resolve(result);
      }
      case '/api/v2/seamail/5c607d43ea204f5815755cda?skip_mark_read=true': {
        const result = TwitarrResult.ok(require('../data/seamail-5c607d43ea204f5815755cda.json'));
        result.type = 'application/json';
        return Promise.resolve(result);
      }
    }

    return Promise.reject(getError('GET', urlObj, options));
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

    return Promise.reject(getError('PUT', urlObj, options));
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

    return Promise.reject(getError('POST', urlObj, options));
  }

  public httpDelete(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>> {
    const urlObj = new URI(url);
    return Promise.reject(getError('DELETE', urlObj, options));
  }
}
