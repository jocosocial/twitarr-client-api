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
import { User } from '../../src/model/User';
import { Util } from '../../src/internal/Util';
import { StreamResponse } from '../../src/model/StreamResponse';

const getError = (method: string, urlObj: any, options?: TwitarrHTTPOptions) => {
  // tslint:disable-next-line
  let message = 'Net yet implemented: ' + method + ' ' + urlObj.toString();
  if (options) {
    message += ': ';
    if (options.parameters) {
      message += 'parameters=' + JSON.stringify(options.parameters);
    }
    if (options.data) {
      message += 'data=' + JSON.stringify(options.data);
    }
  }
  return new Error(message);
};

const jsonOK = (contents: any) => {
  const ret = TwitarrResult.ok(contents);
  ret.type = 'application/json';
  return Promise.resolve(ret);
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
        return jsonOK(require('../data/welcome.json'));
      }
      case '/api/v2/user/new_seamail': {
        return jsonOK({
          email_count: 15,
          status: 'ok',
        });
      }
      case '/api/v2/seamail?app=plain': {
        return jsonOK(require('../data/seamail.json'));
      }
      case '/api/v2/seamail?app=plain&unread=true': {
        return jsonOK(require('../data/seamail-unread-true.json'));
      }
      case '/api/v2/seamail?app=plain&after=1549827395180': {
        return jsonOK(require('../data/seamail-after-epoch.json'));
      }
      case '/api/v2/seamail_threads?app=plain': {
        return jsonOK(require('../data/seamail_threads.json'));
      }
      case '/api/v2/seamail_threads?app=plain&exclude_read_messages=true': {
        return jsonOK(require('../data/seamail_threads-exclude_read_messages-true.json'));
      }
      case '/api/v2/seamail_threads?app=plain&unread=true': {
        return jsonOK(require('../data/seamail_threads-unread-true.json'));
      }
      case '/api/v2/seamail_threads?app=plain&after=1549827390000': {
        return jsonOK(require('../data/seamail_threads-after-epoch.json'));
      }
      case '/api/v2/seamail/5c607d43ea204f5815755cda?app=plain': {
        return jsonOK(require('../data/seamail-5c607d43ea204f5815755cda.json'));
      }
      case '/api/v2/seamail/5c607d43ea204f5815755cda?app=plain&skip_mark_read=true': {
        return jsonOK(require('../data/seamail-5c607d43ea204f5815755cda.json'));
      }
      case '/api/v2/stream?app=plain': {
        return jsonOK(require('../data/stream.json'));
      }
      case '/api/v2/stream?app=plain&limit=5': {
        return jsonOK(require('../data/stream-limit-5.json'));
      }
      case '/api/v2/stream?app=plain&limit=20': {
        return jsonOK(require('../data/stream.json'));
      }
      case '/api/v2/stream?app=plain&hashtag=hashtag': {
        return jsonOK(require('../data/stream-hashtag.json'));
      }
      case '/api/v2/stream?app=plain&newer_posts=true': {
        return jsonOK(require('../data/stream-empty.json'));
      }
      case '/api/v2/stream?app=plain&author=rangerrick': {
        return jsonOK(require('../data/stream-rangerrick.json'));
      }
      case '/api/v2/stream?app=plain&mentions=rangerrick': {
        return jsonOK(require('../data/stream-mentions-rangerrick.json'));
      }
      case '/api/v2/stream?app=plain&include_author=true&mentions=rangerrick': {
        return jsonOK(require('../data/stream-mentions-rangerrick-include-author.json'));
      }
      case '/api/v2/stream?app=plain&start=0': {
        return jsonOK(require('../data/stream.json'));
      }
      case '/api/v2/stream?app=plain&starred=true': {
        return jsonOK(require('../data/stream-mentions-rangerrick.json'));
      }
      case '/api/v2/thread/5c63275ad86b930ad6739cb8?app=plain': {
        return jsonOK(require('../data/stream-thread.json'));
      }
      case '/api/v2/thread/5c63275ad86b930ad6739cb8?app=plain&limit=1': {
        return jsonOK(require('../data/stream-thread-limit.json'));
      }
      case '/api/v2/thread/5c63275ad86b930ad6739cb8?app=plain&limit=1&page=1': {
        return jsonOK(require('../data/stream-thread-limit-page-1.json'));
      }
      case '/api/v2/stream/m/rangerrick?app=plain': {
        return jsonOK(require('../data/stream-mentions-rangerrick-include-author.json'));
      }
      case '/api/v2/stream/h/hashtag?app=plain': {
        return jsonOK(require('../data/stream-hashtag.json'));
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
          return jsonOK({
            key: 'demo:12345',
            status: 'ok',
            username: 'demo',
          });
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
        break;
      }
      case '/api/v2/seamail': {
        // tslint:disable-next-line max-line-length
        if (options.data.subject === 'Test Subject' && options.data.text === 'Test Message' && options.data.users.length === 2) {
          return jsonOK(require('../data/seamail-create-response.json'));
        }
        break;
      }
      case '/api/v2/seamail/5c607d43ea204f5815755cda': {
        // tslint:disable-next-line max-line-length
        if (options.data.text === 'another message') {
          return jsonOK(require('../data/seamail-post.json'));
        }
        break;
      }
      case '/api/v2/stream': {
        if (options.data.text === 'this is a twitter post!' && Util.isEmpty(options.data.parent, options.data.photo)) {
          return jsonOK(require('../data/stream-mentions-rangerrick-include-author.json'));
        }
        break;
      }
      case '/api/v2/tweet/5c63275ad86b930ad6739cb8': {
        return jsonOK(require('../data/stream-mentions-rangerrick-include-author.json'));
      }
      case '/api/v2/tweet/5c63275ad86b930ad6739cb8/locked/true': {
        return jsonOK({
          locked: true,
          status: 'ok',
        });
      }
      case '/api/v2/tweet/5c63275ad86b930ad6739cb8/locked/false': {
        return jsonOK({
          locked: false,
          status: 'ok',
        });
      }
      case '/api/v2/tweet/5c63275ad86b930ad6739cb8/react/like': {
        return jsonOK({
          reactions: {
            like: {
              count: 1,
              me: true,
            },
          },
          status: 'ok',
        });
      }
    }

    return Promise.reject(getError('POST', urlObj, options));
  }

  public httpDelete(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>> {
    const urlObj = new URI(url);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }

    switch (urlObj.toString()) {
      case '/api/v2/tweet/5c63275ad86b930ad6739cb8': {
        return Promise.resolve(TwitarrResult.ok(''));
      }
      case '/api/v2/tweet/5c63275ad86b930ad6739cb8/react/like': {
        return jsonOK({
          reactions: {
            like: {
              count: 0,
              me: false,
            },
          },
          status: 'ok',
        });
      }
    }

    return Promise.reject(getError('DELETE', urlObj, options));
  }
}
