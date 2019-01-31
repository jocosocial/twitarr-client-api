/** @hidden */
declare const Promise;
/** @hidden */
declare const require;

/** @hidden */
// tslint:disable-next-line
const URI = require('urijs');

import {AbstractHTTP} from '../../src/rest/AbstractHTTP';

import {TwitarrHTTPOptions} from '../../src/api/TwitarrHTTPOptions';
import {TwitarrResult} from '../../src/api/TwitarrResult';

export class MockHTTP extends AbstractHTTP {
  /** make an HTTP get call -- this should be overridden by the implementation */
  public get(url: string, options?: TwitarrHTTPOptions) {
    const urlObj = new URI(url);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }

    switch(urlObj.toString()) {
      case 'http://demo.twitarr.com/text/welcome.json': {
        const result = TwitarrResult.ok(require('../data/welcome.json'));
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

    return Promise.reject(new Error('Not yet implemented: GET ' + urlObj.toString()));
  }

  public put(url: string, options?: TwitarrHTTPOptions) {
    const urlObj = new URI(url);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }

    switch(urlObj.toString()) {
      /*
      case 'rest/alarms/404725?ack=true': {
        const result = TwitarrResult.ok('');
        result.type = 'text/plain';
        return Promise.resolve(result);
      }
      */
    }

    return Promise.reject(new Error('Not yet implemented: PUT ' + urlObj.toString()));
  }

  public post(url: string, options?: TwitarrHTTPOptions) {
    const urlObj = new URI(url);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }

    switch(urlObj.toString()) {
      /*
      case 'rest/alarms/404725?ack=true': {
        const result = TwitarrResult.ok('');
        result.type = 'text/plain';
        return Promise.resolve(result);
      }
      */
    }

    return Promise.reject(new Error('Not yet implemented: POST ' + urlObj.toString()));
  }

  public httpDelete(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>> {
    const urlObj = new URI(url);
    return Promise.reject(new Error('Not yet implemented: DELETE ' + urlObj.toString()));
  }
}
