declare const describe, beforeEach, it, expect;

import {TwitarrHTTPOptions} from '../../src/api/TwitarrHTTPOptions';
import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';

describe('TwitarrHTTPOptions', () => {
  it('#toJSON', () => {
    let opts = new TwitarrHTTPOptions();
    expect(opts).toMatchObject({
      timeout: 10000,
    });

    opts = new TwitarrHTTPOptions();
    opts.auth = new TwitarrAuthConfig('user', 'pass', 'key');
    opts.parameters = {
      foo: 'bar',
    };
    opts.headers = {
      'X-Header': 'header',
    };
    expect(opts.toJSON()).toMatchObject({
      auth: {
        key: 'key',
        password: 'pass',
        username: 'user',
      },
      headers: {
        'X-Header': 'header',
      },
      parameters: {
        foo: 'bar',
      },
    });

    opts = new TwitarrHTTPOptions(17);
    expect(opts.toJSON()).toMatchObject({
      timeout: 17,
    });
  });
});
/*
let err;

describe('Given an TwitarrError without a code...', () => {
  beforeEach(() => {
    err = new TwitarrError('blah');
  });

  it('it should return a formatted message when I call toString()', () => {
    expect(err.toString()).toBe('Error: blah');
  });
});

describe('Given an TwitarrError with a code...', () => {
  beforeEach(() => {
    err = new TwitarrError('blah', 404);
  });

  it('it should return a formatted message when I call toString()', () => {
    expect(err.toString()).toBe('Error 404: blah');
  });
});
*/
