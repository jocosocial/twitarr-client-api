declare const await, describe, beforeEach, it, expect, jest;

import {Client} from '../src/Client';
import {TwitarrAuthConfig} from '../src/api/TwitarrAuthConfig';
import {TwitarrResult} from '../src/api/TwitarrResult';
import {TwitarrServer} from '../src/api/TwitarrServer';

import {MockHTTP} from './rest/MockHTTP';

const SERVER_NAME='Demo';
const SERVER_URL='http://demo.twitarr.com/';
const SERVER_USER='demo';
const SERVER_PASSWORD='demo';

let twitarr : Client, server, auth, mockHTTP;

describe('Given an instance of Twitarr...', () => {
  beforeEach(() => {
    mockHTTP = new MockHTTP();
    twitarr = new Client(mockHTTP);
    auth = new TwitarrAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new TwitarrServer(SERVER_NAME, SERVER_URL, auth);
  });
  describe('when I have a default Twitarr object', () => {
    it('it should have no server', () => {
      expect((<any>twitarr).server).toBeUndefined();
    });
    it('it should pass when checkServer is called on a valid server', () => {
      let ret = Client.checkServer(server, mockHTTP);
      expect(ret).toBeDefined();
      return ret.then((result) => {
        expect(result).toBeDefined();
        expect(result).toEqual(true);
      });
    });
    it('it should return a server object when connect is called', () => {
      const ret = twitarr.connect(SERVER_NAME, SERVER_URL, SERVER_USER, SERVER_PASSWORD);
      expect(ret).toBeDefined();
      return ret.then((result) => {
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Client);
        expect(result.server).toBeInstanceOf(TwitarrServer);
      });
    });
  });
});
