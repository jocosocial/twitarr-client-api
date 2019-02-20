declare const describe, beforeEach, it, expect;

import { UserDAO } from '../../src/dao/UserDAO';
import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { MockHTTP } from '../rest/MockHTTP';
import { TwitarrError } from '../../src/api/TwitarrError';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let dao: UserDAO, server, auth, mockHTTP;

describe('dao/UserDAO', () => {
  beforeEach(() => {
    mockHTTP = new MockHTTP();
    dao = new UserDAO(mockHTTP);
    auth = new TwitarrAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new TwitarrServer(SERVER_NAME, SERVER_URL, auth);
    mockHTTP.server = server;
  });

  it('#login', done => {
    dao.login().then(res => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('#login (invalid)', done => {
    auth.password = 'invalid';
    dao.login().catch(err => {
      expect(err).toBeDefined();
      expect(err).toBeInstanceOf(TwitarrError);
      expect(err.message).toEqual('invalid username or password');
      expect(err.code).toEqual(401);
      done();
    });
  });
});
