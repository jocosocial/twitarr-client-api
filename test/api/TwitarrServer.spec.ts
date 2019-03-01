declare const describe, beforeEach, it, expect;

import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrServer } from '../../src/api/TwitarrServer';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let server, auth;

describe('api/TwitarrServer', () => {
  beforeEach(() => {
    auth = new TwitarrAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new TwitarrServer(SERVER_NAME, SERVER_URL, auth);
  });

  describe('new TwitarrServer()', () => {
    beforeEach(() => {
      server = new TwitarrServer();
    });
    it('.id', () => {
      expect(server.id).toBeDefined();
      expect(server.id.length).toEqual(36);
    });
    it('.url', () => {
      expect(server.url).toBeUndefined();
    });
    it('.host', () => {
      expect(server.host).toBeUndefined();
    });
    it('#resolveURL', () => {
      expect(server.resolveURL()).toBeUndefined();
    });
  });

  describe('new TwitarrServer(name, url, auth)', () => {
    it('.id', () => {
      expect(server.id).toBeDefined();
      expect(server.id.length).toEqual(36);
    });
    it('.url', () => {
      expect(server.url).toBeDefined();
      expect(server.url).toEqual(SERVER_URL);
    });
    it('.host', () => {
      expect(server.host).toBeDefined();
      expect(server.host).toEqual('demo.twitarr.com');
    });
    it('#resolveURL(undefined)', () => {
      expect(server.resolveURL()).toBeDefined();
      expect(server.resolveURL()).toEqual(SERVER_URL);
    });
    it('#resolveURL(path)', () => {
      expect(server.resolveURL('foo')).toBeDefined();
      expect(server.resolveURL('foo')).toEqual(SERVER_URL + 'foo');
      expect(server.resolveURL('foo/')).toEqual(SERVER_URL + 'foo');
    });
    it('#resolveURL(absolute-path)', () => {
      expect(server.resolveURL('/rest/foo/')).toEqual(SERVER_URL + 'rest/foo/');
    });
    it('#resolveURL(absolute-path, query-parms)', () => {
      expect(server.resolveURL('/rest/foo', 'foo=bar')).toEqual(SERVER_URL + 'rest/foo?foo%3Dbar');
    });
    it('#resolveURL(relative)', () => {
      expect(server.resolveURL('rest/foo/')).toEqual(SERVER_URL + 'rest/foo');
    });
    it('#resolveURL(path-with-colons)', () => {
      expect(server.resolveURL('rest/foo/A:B:0.0.0.0:C')).toEqual(SERVER_URL + 'rest/foo/A:B:0.0.0.0:C');
    });
    it('#resolveURL(path-with-escaped-slashes)', () => {
      expect(server.resolveURL('rest/S%2FA%3AB%3A0.0.0.0%3AC')).toEqual(SERVER_URL + 'rest/S%2FA:B:0.0.0.0:C');
    });
  });
});
