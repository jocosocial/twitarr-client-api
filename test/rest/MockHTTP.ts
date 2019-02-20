/** @hidden */
declare const Promise;
/** @hidden */
declare const require;

/** @hidden */
const URI = require('urijs');

import { AbstractHTTP } from '../../src/rest/AbstractHTTP';

import { TwitarrHTTPOptions } from '../../src/api/TwitarrHTTPOptions';
import { TwitarrResult } from '../../src/api/TwitarrResult';
import { Util } from '../../src/internal/Util';

const getError = (method: string, urlObj: any, options?: TwitarrHTTPOptions) => {
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

/** Wrap in a JSON 'ok' result. */
const jsonOK = (contents: any) => {
  const ret = TwitarrResult.ok(contents);
  ret.type = 'application/json';
  return Promise.resolve(ret);
};

/** Deep copy. */
const getJsonFromFile = (file: string) => {
  const json = require(file);
  return JSON.parse(JSON.stringify(json));
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
        return jsonOK(getJsonFromFile('../data/welcome.json'));
      }
      case '/api/v2/user/new_seamail': {
        return jsonOK({
          email_count: 15,
          status: 'ok',
        });
      }
      case '/api/v2/user/whoami?app=plain': {
        return jsonOK(getJsonFromFile('../data/user.json'));
      }
      case '/api/v2/user/profile/kvort?app=plain': {
        const json = getJsonFromFile('../data/user.json');
        json.user.username = 'kvort';
        return jsonOK(json);
      }
      case '/api/v2/seamail?app=plain': {
        return jsonOK(getJsonFromFile('../data/seamail.json'));
      }
      case '/api/v2/seamail?app=plain&unread=true': {
        return jsonOK(getJsonFromFile('../data/seamail-unread-true.json'));
      }
      case '/api/v2/seamail?app=plain&after=1549827395180': {
        return jsonOK(getJsonFromFile('../data/seamail-after-epoch.json'));
      }
      case '/api/v2/seamail_threads?app=plain': {
        return jsonOK(getJsonFromFile('../data/seamail_threads.json'));
      }
      case '/api/v2/seamail_threads?app=plain&exclude_read_messages=true': {
        return jsonOK(getJsonFromFile('../data/seamail_threads-exclude_read_messages-true.json'));
      }
      case '/api/v2/seamail_threads?app=plain&unread=true': {
        return jsonOK(getJsonFromFile('../data/seamail_threads-unread-true.json'));
      }
      case '/api/v2/seamail_threads?app=plain&after=1549827390000': {
        return jsonOK(getJsonFromFile('../data/seamail_threads-after-epoch.json'));
      }
      case '/api/v2/seamail/5c607d43ea204f5815755cda?app=plain': {
        return jsonOK(getJsonFromFile('../data/seamail-5c607d43ea204f5815755cda.json'));
      }
      case '/api/v2/seamail/5c607d43ea204f5815755cda?app=plain&skip_mark_read=true': {
        return jsonOK(getJsonFromFile('../data/seamail-5c607d43ea204f5815755cda.json'));
      }
      case '/api/v2/stream?app=plain': {
        return jsonOK(getJsonFromFile('../data/stream.json'));
      }
      case '/api/v2/stream?app=plain&limit=5': {
        return jsonOK(getJsonFromFile('../data/stream-limit-5.json'));
      }
      case '/api/v2/stream?app=plain&limit=20': {
        return jsonOK(getJsonFromFile('../data/stream.json'));
      }
      case '/api/v2/stream?app=plain&hashtag=hashtag': {
        return jsonOK(getJsonFromFile('../data/stream-hashtag.json'));
      }
      case '/api/v2/stream?app=plain&newer_posts=true': {
        return jsonOK(getJsonFromFile('../data/stream-empty.json'));
      }
      case '/api/v2/stream?app=plain&author=rangerrick': {
        return jsonOK(getJsonFromFile('../data/stream-rangerrick.json'));
      }
      case '/api/v2/stream?app=plain&mentions=rangerrick': {
        return jsonOK(getJsonFromFile('../data/stream-mentions-rangerrick.json'));
      }
      case '/api/v2/stream?app=plain&include_author=true&mentions=rangerrick': {
        return jsonOK(getJsonFromFile('../data/stream-mentions-rangerrick-include-author.json'));
      }
      case '/api/v2/stream?app=plain&start=0': {
        return jsonOK(getJsonFromFile('../data/stream.json'));
      }
      case '/api/v2/stream?app=plain&starred=true': {
        return jsonOK(getJsonFromFile('../data/stream-mentions-rangerrick.json'));
      }
      case '/api/v2/thread/5c63275ad86b930ad6739cb8?app=plain': {
        return jsonOK(getJsonFromFile('../data/stream-thread.json'));
      }
      case '/api/v2/thread/5c63275ad86b930ad6739cb8?app=plain&limit=1': {
        return jsonOK(getJsonFromFile('../data/stream-thread-limit.json'));
      }
      case '/api/v2/thread/5c63275ad86b930ad6739cb8?app=plain&limit=1&page=1': {
        return jsonOK(getJsonFromFile('../data/stream-thread-limit-page-1.json'));
      }
      case '/api/v2/stream/m/rangerrick?app=plain': {
        return jsonOK(getJsonFromFile('../data/stream-mentions-rangerrick-include-author.json'));
      }
      case '/api/v2/stream/h/hashtag?app=plain': {
        return jsonOK(getJsonFromFile('../data/stream-hashtag.json'));
      }
      case '/api/v2/photo/12345?app=plain': {
        return jsonOK(getJsonFromFile('../data/photo-foo-png.json'));
      }
      case '/api/v2/hashtag/ac/hash': {
        return jsonOK({
          values: ['hashtag', 'hashtags'],
        });
      }
      case '/api/v2/search/all/rangerrick?app=plain': {
        return jsonOK(getJsonFromFile('../data/search-rangerrick.json'));
      }
      case '/api/v2/user/mentions': {
        return jsonOK({
          status: 'ok',
          mentions: 3,
        });
      }
      case '/api/v2/user/ac/ran?app=plain': {
        return jsonOK({
          status: 'ok',
          users: [
            {
              username: 'rangerrick',
              display_name: 'That Guy',
            },
            {
              username: 'randall',
              display_name: 'The Wrangler',
            },
          ],
        });
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
      case '/api/v2/photo/12345?app=plain': {
        const ret = getJsonFromFile('../data/photo-foo-png.json');
        ret.photo.original_filename = options.data.original_filename;
        return jsonOK(ret);
      }
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
        if (options.data.subject === 'Test Subject' && options.data.text === 'Test Message' && options.data.users.length === 2) {
          return jsonOK(getJsonFromFile('../data/seamail-create-response.json'));
        }
        break;
      }
      case '/api/v2/seamail/5c607d43ea204f5815755cda': {
        if (options.data.text === 'another message') {
          return jsonOK(getJsonFromFile('../data/seamail-post.json'));
        }
        break;
      }
      case '/api/v2/stream': {
        if (options.data.text === 'this is a twitter post!' && Util.isEmpty(options.data.parent, options.data.photo)) {
          return jsonOK(getJsonFromFile('../data/stream-mentions-rangerrick-include-author.json'));
        }
        break;
      }
      case '/api/v2/tweet/5c63275ad86b930ad6739cb8': {
        return jsonOK(getJsonFromFile('../data/stream-mentions-rangerrick-include-author.json'));
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
      case '/api/v2/user/change_password': {
        if (options.data.current_password === 'oldPassword') {
          return jsonOK({
            status: 'ok',
          });
        } else if (options.data.current_password === 'badPassword') {
          const result = this.handleError(
            {
              response: {
                code: 400,
                data: {
                  status: 'error',
                  message: 'Current password is incorrect.',
                },
              },
            },
            options,
          );
          return Promise.reject(result);
        }
      }
      case '/api/v2/user/reset_password': {
        if (options.data.username === 'rangerrick' && options.data.registration_code === '123456') {
          return jsonOK({
            status: 'ok',
            message: 'Your password has been changed.',
          });
        } else if (options.data.username === 'rangerrick' && options.data.registration_code !== '123456') {
          const result = this.handleError(
            {
              response: {
                code: 400,
                data: {
                  status: 'error',
                  errors: {
                    username: ['Username and registration code combination not found.'],
                  },
                },
              },
            },
            options,
          );
          return Promise.reject(result);
        }
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
      case '/api/v2/photo/12345': {
        return Promise.resolve(TwitarrResult.ok(undefined, undefined, 204, undefined));
      }
      case '/api/v2/user/mentions': {
        return jsonOK({
          status: 'ok',
          mentions: 0,
        });
      }
    }

    return Promise.reject(getError('DELETE', urlObj, options));
  }

  public postFile(url: string, fileName: string, contentType: string, data: Buffer, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>> {
    const urlObj = new URI(url);
    if (options && options.parameters) {
      urlObj.search(options.parameters);
    }

    switch (urlObj.toString()) {
      case '/api/v2/photo': {
        if (fileName === 'foo.png') {
          return jsonOK(getJsonFromFile('../data/photo-foo-png.json'));
        }
      }
    }

    return Promise.reject(getError('POST (' + fileName + ')', urlObj, options));
  }
}
