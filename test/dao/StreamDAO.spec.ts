declare const describe, beforeEach, it, expect;

import { StreamDAO } from '../../src/dao/StreamDAO';
import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { MockHTTP } from '../rest/MockHTTP';
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
    it('posts()', async (done) => {
      const ret = await dao.posts();
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(20);
      done();
    });
    it('posts(author=rangerrick)', async (done) => {
      const ret = await dao.posts({ author: 'rangerrick' });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(1);
      done();
    });
    it('posts(hashtag=hashtag)', async (done) => {
      const ret = await dao.posts({ hashtag: 'hashtag' });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(1);
      done();
    });
    it('posts(limit=5)', async (done) => {
      const ret = await dao.posts({ limit: 5 });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(5);
      done();
    });
    it('posts(limit=20)', async (done) => {
      const ret = await dao.posts({ limit: 20 });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(20);
      done();
    });
    it('posts(mentions=rangerrick)', async (done) => {
      const ret = await dao.posts({ mentions: 'rangerrick' });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(0);
      done();
    });
    it('posts(mentions=rangerrick&include_author=true)', async (done) => {
      const ret = await dao.posts({ include_author: true, mentions: 'rangerrick' });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(1);
      done();
    });
    it('posts(newer_posts=true)', async (done) => {
      const ret = await dao.posts({ newer_posts: true });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(0);
      done();
    });
    it('posts(start=0)', async (done) => {
      const ret = await dao.posts({ start: Util.toMoment(0) });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(20);
      done();
    });
    it('posts(starred=true)', async (done) => {
      const ret = await dao.posts({ starred: true });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(0);
      done();
    });
  });
  describe('#thread', () => {
    it('thread(id)', async (done) => {
      const ret = await dao.thread('5c63275ad86b930ad6739cb8');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0].children).toBeDefined();
      expect(ret.posts[0].children.length).toEqual(2);
      done();
    });
    it('thread(id, limit=1)', async (done) => {
      const ret = await dao.thread('5c63275ad86b930ad6739cb8', 1);
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0].children).toBeDefined();
      expect(ret.posts[0].children.length).toEqual(1);
      expect(ret.posts[0].children[0].id).toEqual('5c6349e4ffef0beb3eae1e78');
      done();
    });
    it('thread(id, limit=1, page=1)', async (done) => {
      const ret = await dao.thread('5c63275ad86b930ad6739cb8', 1, 1);
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0].children).toBeDefined();
      expect(ret.posts[0].children.length).toEqual(1);
      expect(ret.posts[0].children[0].id).toEqual('5c634ad6ffef0beb3eae1e79');
      done();
    });
  });
  describe('#mentions', () => {
    it('mentions(username)', async (done) => {
      const ret = await dao.mentions('rangerrick');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0]).toBeDefined();
      expect(ret.posts.length).toEqual(1);
      done();
    });
  });
  describe('#hashtag', () => {
    it('hashtag(tag)', async (done) => {
      const ret = await dao.hashtag('hashtag');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0]).toBeDefined();
      expect(ret.posts.length).toEqual(1);
      done();
    });
  });
  describe('#send', () => {
    it('send(message)', async (done) => {
      const ret = await dao.send('this is a twitter post!');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0]).toBeDefined();
      expect(ret.posts.length).toEqual(1);
      done();
    });
  });
  describe('#update', () => {
    it('update(id, message)', async (done) => {
      const ret = await dao.update('5c63275ad86b930ad6739cb8', 'this is no longer a twitter post!');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0]).toBeDefined();
      expect(ret.posts.length).toEqual(1);
      done();
    });
  });
});
