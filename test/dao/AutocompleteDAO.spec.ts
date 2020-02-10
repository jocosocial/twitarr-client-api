declare const describe, beforeEach, it, expect;

import { AutocompleteDAO } from '../../src/dao/AutocompleteDAO';

import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { MockHTTP } from '../rest/MockHTTP';
import { ITwitarrHTTP } from '../../src/api/ITwitarrHTTP';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let dao: AutocompleteDAO, server: TwitarrServer, auth: TwitarrAuthConfig, mockHTTP: ITwitarrHTTP;

describe('dao/SearchDAO', () => {
  beforeEach(() => {
    auth = new TwitarrAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new TwitarrServer(SERVER_NAME, SERVER_URL, auth);
    mockHTTP = new MockHTTP(server);
    dao = new AutocompleteDAO(mockHTTP);
  });
  describe('#hashtags', () => {
    it('hashtags(h)', async (done: Function) => {
      const ret = await dao.hashtags('h');
      expect(ret).toBeDefined();
      expect(ret.length).toEqual(0);
      done();
    });
    it('hashtags(hash)', async (done: Function) => {
      const ret = await dao.hashtags('hash');
      expect(ret).toBeDefined();
      expect(ret.length).toEqual(2);
      expect(ret[0]).toEqual('hashtag');
      done();
    });
  });
  describe('#users', () => {
    it('users(ran)', async (done: Function) => {
      const ret = await dao.users('ran');
      expect(ret).toBeDefined();
      expect(Array.isArray(ret)).toBeTruthy();
      expect(ret.length).toEqual(2);
      expect(ret[0].username).toEqual('rangerrick');
      done();
    });
  });
});
