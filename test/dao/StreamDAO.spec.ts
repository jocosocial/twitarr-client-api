declare const describe, beforeEach, it, expect;

import { StreamDAO } from '../../src/dao/StreamDAO';
import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { MockHTTP } from '../rest/MockHTTP';
import { StreamResponse } from '../../src/model/StreamResponse';
import { Util } from '../../src/internal/Util';
import { ReactionsSummary } from '../../src/model/ReactionsSummary';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let dao: StreamDAO, server, auth, mockHTTP;

describe('dao/StreamDAO', () => {
  beforeEach(() => {
    auth = new TwitarrAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new TwitarrServer(SERVER_NAME, SERVER_URL, auth);
    mockHTTP = new MockHTTP(server);
    dao = new StreamDAO(mockHTTP);
  });
  describe('#posts', () => {
    it('posts()', async done => {
      const ret = await dao.posts();
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(20);
      done();
    });
    it('posts(author=rangerrick)', async done => {
      const ret = await dao.posts({ author: 'rangerrick' });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(1);
      done();
    });
    it('posts(hashtag=hashtag)', async done => {
      const ret = await dao.posts({ hashtag: 'hashtag' });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(1);
      done();
    });
    it('posts(limit=5)', async done => {
      const ret = await dao.posts({ limit: 5 });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(5);
      done();
    });
    it('posts(limit=20)', async done => {
      const ret = await dao.posts({ limit: 20 });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(20);
      done();
    });
    it('posts(mentions=rangerrick)', async done => {
      const ret = await dao.posts({ mentions: 'rangerrick' });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(0);
      done();
    });
    it('posts(mentions=rangerrick&include_author=true)', async done => {
      const ret = await dao.posts({ include_author: true, mentions: 'rangerrick' });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(1);
      done();
    });
    it('posts(newer_posts=true)', async done => {
      const ret = await dao.posts({ newer_posts: true });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(0);
      done();
    });
    it('posts(start=0)', async done => {
      const ret = await dao.posts({ start: Util.toDateTime(0) });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(20);
      done();
    });
    it('posts(starred=true)', async done => {
      const ret = await dao.posts({ starred: true });
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts.length).toEqual(0);
      done();
    });
  });
  describe('#thread', () => {
    it('thread(id)', async done => {
      const ret = await dao.thread('5c63275ad86b930ad6739cb8');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0].children).toBeDefined();
      expect(ret.posts[0].children.length).toEqual(2);
      done();
    });
    it('thread(id, limit=1)', async done => {
      const ret = await dao.thread('5c63275ad86b930ad6739cb8', 1);
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0].children).toBeDefined();
      expect(ret.posts[0].children.length).toEqual(1);
      expect(ret.posts[0].children[0].id).toEqual('5c6349e4ffef0beb3eae1e78');
      done();
    });
    it('thread(id, limit=1, page=1)', async done => {
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
    it('mentions(username)', async done => {
      const ret = await dao.mentions('rangerrick');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0]).toBeDefined();
      expect(ret.posts.length).toEqual(1);
      done();
    });
  });
  describe('#hashtag', () => {
    it('hashtag(tag)', async done => {
      const ret = await dao.hashtag('hashtag');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0]).toBeDefined();
      expect(ret.posts.length).toEqual(1);
      done();
    });
  });
  describe('#send', () => {
    it('send(message)', async done => {
      const ret = await dao.send('this is a twitter post!');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0]).toBeDefined();
      expect(ret.posts.length).toEqual(1);
      done();
    });
  });
  describe('#updatePost', () => {
    it('updatePost(id, message)', async done => {
      const ret = await dao.updatePost('5c63275ad86b930ad6739cb8', 'this is no longer a twitter post!');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(StreamResponse);
      expect(ret.posts[0]).toBeDefined();
      expect(ret.posts.length).toEqual(1);
      done();
    });
  });
  describe('#deletePost', () => {
    it('deletePost(id)', async done => {
      const ret = await dao.deletePost('5c63275ad86b930ad6739cb8');
      expect(ret).toBeDefined();
      expect(ret).toBeTruthy();
      done();
    });
  });
  describe('#lockPost', () => {
    it('lockPost(id)', async done => {
      const ret = await dao.lockPost('5c63275ad86b930ad6739cb8');
      expect(ret).toBeDefined();
      expect(ret).toBeTruthy();
      done();
    });
  });
  describe('#unlockPost', () => {
    it('unlockPost(id)', async done => {
      const ret = await dao.unlockPost('5c63275ad86b930ad6739cb8');
      expect(ret).toBeDefined();
      expect(ret).toBeFalsy();
      done();
    });
  });
  describe('#react', () => {
    it('react(id, reaction)', async done => {
      const ret = await dao.react('5c63275ad86b930ad6739cb8', 'like');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(ReactionsSummary);
      expect(ret.reactions).toBeDefined();
      expect(ret.reactions.like).toBeDefined();
      expect(ret.reactions.like).toMatchObject({
        count: 1,
        me: true,
      });
      done();
    });
  });
  describe('#deleteReact', () => {
    it('deleteReact(id, reaction)', async done => {
      const ret = await dao.deleteReact('5c63275ad86b930ad6739cb8', 'like');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(ReactionsSummary);
      expect(ret.reactions).toBeDefined();
      expect(ret.reactions.like).toBeDefined();
      expect(ret.reactions.like).toMatchObject({
        count: 0,
        me: false,
      });
      done();
    });
  });
});
