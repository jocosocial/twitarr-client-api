declare const describe, beforeEach, it, expect;

import { SeamailDAO } from '../../src/dao/SeamailDAO';
import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { SeamailResponse } from '../../src/model/SeamailResponse';

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
      done();
    });
  });

});
