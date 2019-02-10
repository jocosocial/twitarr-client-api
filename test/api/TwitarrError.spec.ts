declare const describe, beforeEach, it, expect;

import { TwitarrError } from '../../src/api/TwitarrError';

let err;

describe('api/TwitarrError', () => {
  describe('new TwitarrError(message)', () => {
    beforeEach(() => {
      err = new TwitarrError('blah');
    });

    it('#toString', () => {
      expect(err.toString()).toBe('Error: blah');
    });
  });

  describe('new TwitarrError(message, code)', () => {
    beforeEach(() => {
      err = new TwitarrError('blah', 404);
    });

    it('#toString', () => {
      expect(err.toString()).toBe('Error 404: blah');
    });
  });

  describe('Status Codes', () => {
    it('status_code_only', () => {
      err = new TwitarrError('message', 401);
      expect(err.toString()).toBe('Error 401: message');
    });

    it('status_code_with_message', () => {
      err = new TwitarrError('message', 401, 'error message');
      expect(err.toString()).toBe('Error 401: message: [error message]');

      err = new TwitarrError(undefined, 401, 'error message');
      expect(err.toString()).toBe('Error 401: [error message]');
    });

    it('status_code_with_error_list', () => {
      err = new TwitarrError('message', 401, ['error 1', 'error 2']);
      expect(err.toString()).toBe('Error 401: message: [error 1,error 2]');

      err = new TwitarrError(undefined, 401, ['error 1', 'error 2']);
      expect(err.toString()).toBe('Error 401: [error 1,error 2]');
    });

    it('status_code_with_parameters_errors', () => {
      err = new TwitarrError(undefined, 401, { blah: ['error 1', 'error 2'] });
      expect(err.toString()).toBe('Error 401: {blah:[error 1,error 2]}');
    });
  });
});
