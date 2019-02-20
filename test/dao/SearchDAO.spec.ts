declare const describe, beforeEach, it, expect;

import { SearchDAO } from '../../src/dao/SearchDAO';

import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { SearchResponse } from '../../src/model/SearchResponse';

import { MockHTTP } from '../rest/MockHTTP';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let dao: SearchDAO, server, auth, mockHTTP;

describe('dao/SearchDAO', () => {
  beforeEach(() => {
    auth = new TwitarrAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new TwitarrServer(SERVER_NAME, SERVER_URL, auth);
    mockHTTP = new MockHTTP(server);
    dao = new SearchDAO(mockHTTP);
  });
  describe('#hashtags', () => {
    it('hashtags(h)', async done => {
      const ret = await dao.hashtags('h');
      expect(ret).toBeDefined();
      expect(ret.length).toEqual(0);
      done();
    });
    it('hashtags(hash)', async done => {
      const ret = await dao.hashtags('hash');
      expect(ret).toBeDefined();
      expect(ret.length).toEqual(2);
      expect(ret[0]).toEqual('hashtag');
      done();
    });
  });
  describe('#all', () => {
    it('all(rangerrick)', async done => {
      const ret = await dao.all('rangerrick');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(SearchResponse);
      expect(ret.query).toEqual('rangerrick');
      expect(ret.users.matches).toBeDefined();
      expect(ret.users.matches.length).toEqual(1);
      expect(ret.users.matches[0].username).toEqual('rangerrick');
      expect(ret.seamails.matches).toBeDefined();
      expect(ret.seamails.matches.length).toEqual(1);
      expect(ret.seamails.matches[0].subject).toEqual('Meet up before the concert?');
      expect(ret.streamPosts.matches).toBeDefined();
      expect(ret.streamPosts.matches.length).toEqual(1);
      expect(ret.streamPosts.matches[0].text).toEqual('This post is a #hashtag #test that uses #lots of #hashtags #hastagapalooza');
      done();
    });
  });
});
