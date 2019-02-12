declare const describe, beforeEach, it, expect;

import { StreamDAO } from '../../src/dao/StreamDAO';
import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { MockHTTP } from '../rest/MockHTTP';
import { StreamPost } from '../../src/model/StreamPost';
import { StreamResponse } from '../../src/model/StreamResponse';
import { Util } from '../../src/internal/Util';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let dao: StreamDAO, server, auth, mockHTTP;

/* tslint:disable object-literal-sort-keys max-line-length */

const assertThreadsMatch = (expected, actual) => {
  expect(Object.keys(expected).length).toEqual(actual.threads.length);
  Object.keys(expected).forEach((threadId, index) => {
    const actualThread = actual.threads[index];
    expect(threadId).toEqual(actualThread.id);
    const messages = actualThread.messages.map((message) => message.id);
    expect(expected[threadId]).toEqual(expect.arrayContaining(messages));
    expect(messages).toEqual(expect.arrayContaining(expected[threadId]));
  });
};

describe('dao/StreamDAO', () => {
  beforeEach(() => {
    auth = new TwitarrAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new TwitarrServer(SERVER_NAME, SERVER_URL, auth);
    mockHTTP = new MockHTTP(server);
    dao = new StreamDAO(mockHTTP);
  });
  describe('#posts', () => {
    it('no arguments', async (done) => {
      const ret = await dao.posts();
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.stream_posts.length).toEqual(20);
      done();
    });
    it('author=rangerrick', async (done) => {
      const ret = await dao.posts({ author: 'rangerrick' });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.stream_posts.length).toEqual(1);
      done();
    });
    it('hashtag=hashtag', async (done) => {
      const ret = await dao.posts({ hashtag: 'hashtag' });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.stream_posts.length).toEqual(1);
      done();
    });
    it('limit=5', async (done) => {
      const ret = await dao.posts({ limit: 5 });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.stream_posts.length).toEqual(5);
      done();
    });
    it('limit=20', async (done) => {
      const ret = await dao.posts({ limit: 20 });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.stream_posts.length).toEqual(20);
      done();
    });
    it('mentions=rangerrick', async (done) => {
      const ret = await dao.posts({ mentions: 'rangerrick' });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.stream_posts.length).toEqual(0);
      done();
    });
    it('mentions=rangerrick&include_author=true', async (done) => {
      const ret = await dao.posts({ include_author: true, mentions: 'rangerrick' });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.stream_posts.length).toEqual(1);
      done();
    });
    it('newer_posts', async (done) => {
      const ret = await dao.posts({ newer_posts: true });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.stream_posts.length).toEqual(0);
      done();
    });
    it('start=0', async (done) => {
      const ret = await dao.posts({ start: Util.toMoment(0) });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.stream_posts.length).toEqual(20);
      done();
    });
    it('starred=true', async (done) => {
      const ret = await dao.posts({ starred: true });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.stream_posts.length).toEqual(0);
      done();
    });
  });
});
