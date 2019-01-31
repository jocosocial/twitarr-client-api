declare const describe, beforeEach, it, expect;

import {TwitarrError} from '../../src/api/TwitarrError';

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

