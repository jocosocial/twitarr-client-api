declare const describe, beforeEach, it, expect;

import { SeamailDAO } from '../../src/dao/SeamailDAO';
import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { SeamailResponse } from '../../src/model/SeamailResponse';

import { Util } from '../../src/internal/Util';

import { MockHTTP } from '../rest/MockHTTP';
import { sort } from 'shelljs';
import { User } from '../../src/model/User';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let dao: SeamailDAO, server, auth, mockHTTP;

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

describe('dao/SeamailDAO', () => {
  beforeEach(() => {
    auth = new TwitarrAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new TwitarrServer(SERVER_NAME, SERVER_URL, auth);
    mockHTTP = new MockHTTP(server);
    dao = new SeamailDAO(mockHTTP);
  });
  describe('#getMetadata', () => {
    it('no arguments', async (done) => {
      const ret = await dao.getMetadata();
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(SeamailResponse);
      expect(ret.threads[0].is_unread).toBeFalsy();
      done();
    });
    it('unread=true', async (done) => {
      const ret = await dao.getMetadata(true);
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(SeamailResponse);
      expect(ret.threads[0].is_unread).toBeTruthy();
      done();
    });
    it('after=<date>', async (done) => {
      const ret = await dao.getMetadata(undefined, Util.toMoment(1549827395180));
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(SeamailResponse);
      expect(ret.threads.length).toEqual(0);
      done();
    });
  });
  describe('#getThreads', () => {
    it('no arguments', async (done) => {
      const ret = await dao.getThreads();
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(SeamailResponse);
      expect(ret.threads.length).toEqual(3);
      expect(ret.threads[0].users.length).toEqual(3);
      expect(ret.threads[0].messages.length).toEqual(1);
      expect(ret.threads[0].is_unread).toBeFalsy();
      expect(ret.threads[0].count_is_unread).toBeFalsy();
      assertThreadsMatch({
        '5c607d43ea204f5815755cda': ['5c607d43ea204f5815755cdb'],
        '5c5cfd9f1fca877544f927da': ['5c5cfd9f1fca877544f927dc', '5c5cfd9f1fca877544f927db'],
        '5c5cfd9f1fca877544f927d6': ['5c5cfd9f1fca877544f927d9', '5c5cfd9f1fca877544f927d8', '5c5cfd9f1fca877544f927d7'],
      }, ret);
      done();
    });
    it('exclude_read_messages=true', async (done) => {
      const ret = await dao.getThreads(false, true);
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(SeamailResponse);
      expect(ret.threads.length).toEqual(3);
      expect(ret.threads[0].users.length).toEqual(3);
      expect(ret.threads[0].messages.length).toEqual(0);
      expect(ret.threads[0].is_unread).toBeFalsy();
      expect(ret.threads[0].count_is_unread).toBeFalsy();
      assertThreadsMatch({
        '5c607d43ea204f5815755cda': [],
        '5c5cfd9f1fca877544f927da': ['5c5cfd9f1fca877544f927dc', '5c5cfd9f1fca877544f927db'],
        '5c5cfd9f1fca877544f927d6': ['5c5cfd9f1fca877544f927d9', '5c5cfd9f1fca877544f927d7'],
      }, ret);
      done();
    });
    it('unread=true', async (done) => {
      const ret = await dao.getThreads(true);
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(SeamailResponse);
      expect(ret.threads.length).toEqual(2);
      expect(ret.threads[0].users.length).toEqual(3);
      expect(ret.threads[0].messages.length).toEqual(2);
      expect(ret.threads[0].is_unread).toBeTruthy();
      expect(ret.threads[0].count_is_unread).toBeTruthy();
      assertThreadsMatch({
        '5c5cfd9f1fca877544f927da': ['5c5cfd9f1fca877544f927dc', '5c5cfd9f1fca877544f927db'],
        '5c5cfd9f1fca877544f927d6': ['5c5cfd9f1fca877544f927d9', '5c5cfd9f1fca877544f927d7'],
      }, ret);
      done();
    });
    it('after=<date>', async (done) => {
      const ret = await dao.getThreads(undefined, undefined, Util.toMoment(1549827390000));
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(SeamailResponse);
      expect(ret.threads.length).toEqual(1);
      expect(ret.threads[0].users.length).toEqual(3);
      expect(ret.threads[0].messages.length).toEqual(1);
      expect(ret.threads[0].is_unread).toBeFalsy();
      expect(ret.threads[0].count_is_unread).toBeFalsy();
      assertThreadsMatch({
        '5c607d43ea204f5815755cda': ['5c607d43ea204f5815755cdb'],
      }, ret);
      done();
    });
  });

  describe('#get', () => {
    it('no arguments', async (done) => {
      dao.get(undefined).catch((err) => {
        expect(err).toBeDefined();
        expect(err.message).toBe('id is required!');
        done();
      });
    });

    it('get(id)', async (done) => {
      dao.get('5c607d43ea204f5815755cda').then((thread) => {
        expect(thread).toBeDefined();
        expect(thread.threads).toBeDefined();
        expect(thread.threads.length).toEqual(1);
        done();
      });
    });

    it('get(id)', async (done) => {
      dao.get('5c607d43ea204f5815755cda', true).then((thread) => {
        expect(thread).toBeDefined();
        expect(thread.threads).toBeDefined();
        expect(thread.threads.length).toEqual(1);
        done();
      });
    });

    it('create()', async (done) => {
      dao.create('Test Subject', 'Test Message', 'twitarrteam', 'rangerrick').then((response) => {
        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(SeamailResponse);
        done();
      });
    });
  });
});
