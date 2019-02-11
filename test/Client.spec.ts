declare const describe, beforeEach, it, expect;

import { Client } from '../src/Client';
import { TwitarrAuthConfig } from '../src/api/TwitarrAuthConfig';
import { TwitarrServer } from '../src/api/TwitarrServer';

import { MockHTTP } from './rest/MockHTTP';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let twitarr: Client, server, auth, mockHTTP;

describe('Client', () => {
  beforeEach(() => {
    mockHTTP = new MockHTTP();
    twitarr = new Client(mockHTTP);
    auth = new TwitarrAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new TwitarrServer(SERVER_NAME, SERVER_URL, auth);
  });
  describe('* default object', () => {
    it('* server = undefined', () => {
      expect((twitarr).server).toBeUndefined();
    });
    it('#checkServer', () => {
      const ret = Client.checkServer(server, mockHTTP);
      expect(ret).toBeDefined();
      return ret.then((result) => {
        expect(result).toBeDefined();
        expect(result).toEqual(true);
      });
    });
    it('#checkServer=invalid', () => {
      auth.password = 'invalid';
      const ret = Client.checkServer(server, mockHTTP);
      expect(ret).toBeDefined();
      return ret.then((result) => {
        expect(result).toBeDefined();
        expect(result).toEqual(true);
      });
    });
    it('#connect', () => {
      const ret = twitarr.connect(SERVER_NAME, SERVER_URL, SERVER_USER, SERVER_PASSWORD);
      expect(ret).toBeDefined();
      return ret.then((result) => {
        expect(result).toBeDefined();
        expect(result).toEqual('demo:12345');
      });
    });
  });
});
