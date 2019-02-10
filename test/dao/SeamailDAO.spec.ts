declare const describe, beforeEach, it, expect;

import { SeamailDAO } from '../../src/dao/SeamailDAO';
import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { SeamailResponse } from '../../src/model/SeamailResponse';

import { Util } from '../../src/internal/Util';

import { MockHTTP } from '../rest/MockHTTP';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let dao: SeamailDAO, server, auth, mockHTTP;

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

});
