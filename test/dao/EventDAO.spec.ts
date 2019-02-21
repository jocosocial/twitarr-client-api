declare const describe, beforeEach, it, expect;

import { EventDAO } from '../../src/dao/EventDAO';
import { Event } from '../../src/model/Event';
import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { MockHTTP } from '../rest/MockHTTP';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let dao: EventDAO, server, auth, mockHTTP;

describe('dao/PhotoDAO', () => {
  beforeEach(() => {
    auth = new TwitarrAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new TwitarrServer(SERVER_NAME, SERVER_URL, auth);
    mockHTTP = new MockHTTP(server);
    dao = new EventDAO(mockHTTP);
  });
  describe('#all', () => {
    it('all()', async done => {
      const ret = await dao.all();
      expect(ret).toBeDefined();
      expect(ret.length).toEqual(4);
      expect(ret[0]).toBeInstanceOf(Event);
      expect(ret[0].id).toEqual('1');
      expect(ret[1].id).toEqual('2');
      expect(ret[2].id).toEqual('3');
      expect(ret[3].id).toEqual('4');
      done();
    });
  });
});
